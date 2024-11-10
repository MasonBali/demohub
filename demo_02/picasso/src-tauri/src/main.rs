// Prevents additional console window on Windows in release, DO NOT REMOVE!!
// #![cfg_attr(not(debug_assertions), windows_subsystem = "console")]
use std::process::{ Command };
use std::fs;
use std::time::Duration;
use std::thread;
use tauri::{ Manager, Window, AppHandle };
use reqwest;
use serde_json::Value;
use std::net::TcpStream;
use std::path::PathBuf;


fn is_server_running(port: u16) -> bool {
    TcpStream::connect_timeout(&format!("127.0.0.1:{}", port).parse().unwrap(), Duration::from_secs(1)).is_ok()
}

#[tauri::command]
async fn login(app_handle: AppHandle) -> Result<Value, String> {
    let client = reqwest::Client::new();
    let res = client.get("http://localhost:3001/login")
        .send()
        .await
        .map_err(|e| e.to_string())?;
    let json: Value = res.json()
        .await
        .map_err(|e| e.to_string())?;

    // Bring the main window to the front
    if let Some(window) = app_handle.get_window("main") {
        window.set_focus().map_err(|e| e.to_string())?;
    }
    Ok(json)
}

#[tauri::command]
async fn logout(app_handle: AppHandle) -> Result<Value, String> {
    let client = reqwest::Client::new();
    let res = client.get("http://localhost:3001/logout")
        .send()
        .await
        .map_err(|e| e.to_string())?;
    let json: Value = res.json()
        .await
        .map_err(|e| e.to_string())?;
    // Bring the main window to the front
    if let Some(window) = app_handle.get_window("main") {
        window.set_focus().map_err(|e| e.to_string())?;
    }
    Ok(json)
}


#[tauri::command]
fn run_python_command(
    venv_python_path: String,
    script_path: String,
    server_ready_path: String
) -> Result<String, String> {
    log::info!("venv_python_path: {:?}", venv_python_path);
    log::info!("script_path: {:?}", script_path);
    log::info!("server_ready_path: {:?}", server_ready_path);
    // Delete the server_ready.txt file if it exists
    // let _ = fs::remove_file(server_ready_path.clone());
    let _ = fs::remove_file(server_ready_path.clone());

    // Check if the file has been removed
    match fs::metadata(server_ready_path.clone()) {
        Ok(_) => {
            log::error!("Failed to delete file");
            return Err("Failed to delete file".to_string());
        }
        Err(_) => {
            log::info!("File deleted successfully");
        }
    }

    let mut command = Command::new(venv_python_path);
    command.arg(script_path);
    command.arg("--pipe");
    command.arg("turbo_xl");
    command.arg("--server_ready");
    command.arg(server_ready_path.clone());
    match command.spawn() {
        Ok(_child) => {
            loop {
                thread::sleep(Duration::from_secs(1)); // wait for 1 second
                // if let Ok(_) = fs::read_to_string(server_ready_path.clone()) {
                if let Ok(_) = fs::read_to_string(server_ready_path.clone()) {
                    log::info!("Command finished successfully");
                    return Ok("Command started successfully".to_string());
                }
            }
        }
        Err(e) => {
            log::error!("Failed to start command: {}", e);
            Err(format!("Failed to start command: {}", e))
        }
    }
}

// This command must be async so that it doesn't run on the main thread.
#[tauri::command]
async fn close_splashscreen(window: Window) {
    // Close splashscreen
    window
        .get_window("splashscreen")
        .expect("no window labeled 'splashscreen' found")
        .close()
        .unwrap();
    // Show main window
    window.get_window("main").expect("no window labeled 'main' found").show().unwrap();
}

fn main() {
    simple_logger::SimpleLogger::new().init().unwrap();
    tauri::Builder::default()
        .setup(|_app| {
            // Get the resource path where your index.js is located
            let resource_path = PathBuf::from("C:/Users/eteki/PycharmProjects/ms-tauri-desktop-auth/index.js");

            println!("Resource path: {:?}", resource_path);
            println!("Parent directory: {:?}", resource_path.parent().unwrap());
            // Start the Node.js server when the app launches
            let _handle = tauri::async_runtime::spawn(async move {
                let output = std::process::Command::new("node")
                    .arg(&resource_path)
                    .current_dir(resource_path.parent().unwrap())
                    .output()
                    .expect("Failed to execute command");
                println!("Node.js server output: {}", String::from_utf8_lossy(&output.stdout));
                println!("Node.js server error: {}", String::from_utf8_lossy(&output.stderr));

                // Wait for the server to start
                let mut attempts = 0;
                while !is_server_running(3001) {
                    if attempts > 30 {  // Wait for up to 30 seconds
                        panic!("Failed to start Node.js server after 30 seconds");
                    }
                    std::thread::sleep(Duration::from_secs(1));
                    attempts += 1;
                }
                println!("Node.js server started successfully on port 3001");
            });
            Ok(())
        })
        .invoke_handler(tauri::generate_handler![login, logout, run_python_command, close_splashscreen])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}