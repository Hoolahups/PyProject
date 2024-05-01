from PIL import Image
import os
import time

# Get the directory of the script
script_directory = os.path.dirname(os.path.abspath(__file__))

# Change the current working directory
os.chdir(script_directory)

# Categories and other variables setup
categories = ['cpus', 'display_res', 'gpus', 'hd', 'physical_cpus', 'ram', 'vram']
start_year = 2008
end_year = 2023
months_of_interest = ['01', '03', '05', '07', "09", "011"]
base_path = "graphs/{}/file"

# Process each category
for category in categories:
    # Collect paths for current category
    current_paths = []
    for year in range(start_year, end_year + 1):
        for month in months_of_interest:
            filename = f"percentage{year}-{month}.png"
            file_path = base_path.format(category).replace("file", filename)
            if os.path.exists(file_path):
                current_paths.append(file_path)
    
    # Load images from paths
    images = [Image.open(path) for path in current_paths if os.path.exists(path)]

    # Save as GIF (assuming all images are of the same size)
    if images:
        gif_path = f"gifs/{category}.gif"
        images[0].save(gif_path, save_all=True, append_images=images[1:], optimize=False, duration=666, loop=0)
