// Prevents additional console window on Windows in release, DO NOT REMOVE!!
// #![cfg_attr(not(debug_assertions), windows_subsystem = "console")]
use std::env;
use std::process::{ Command };
use std::fs;
use std::time::Duration;
use std::thread;
use tauri::{ Manager, Window };

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
        .invoke_handler(tauri::generate_handler![run_python_command, close_splashscreen])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
