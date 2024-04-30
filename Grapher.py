import pandas as pd
import matplotlib.pyplot as plt
import os
# Get the directory of the script
script_directory = os.path.dirname(os.path.abspath(__file__))

# Change the current working directory
os.chdir(script_directory)

current_directory = os.getcwd()
files_and_directories = os.listdir(current_directory)
print("Files and directories in '", current_directory, "':")
for item in files_and_directories:
    print(item)
