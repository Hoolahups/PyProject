from PIL import Image
import time

# List of paths to your PNG images
image_paths = ['image1.png', 'image2.png', 'image3.png', ...]

# Open all images
images = [Image.open(path) for path in image_paths]

# Display each image for a specified duration
duration_per_frame = 0.1  # Adjust as needed
for img in images:
    img.show()
    time.sleep(duration_per_frame)
