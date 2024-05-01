import os
import pandas as pd
import matplotlib.pyplot as plt

# Set the working directory
script_directory = os.path.dirname(os.path.abspath(__file__))
os.chdir(script_directory)

# Define a list of CSV files
csv_files = ['cpus', 'display_res', 'gpus', 'hd', 'physical_cpus', 'ram', 'vram']
data_folder = 'data'
graph_folder = 'graphs'

# Function to plot and save line graphs
def plot_and_save(data, name, folder):
    plt.style.use('dark_background')  # A more suitable style for line graphs
    plt.figure(figsize=(10, 5))
    plt.plot(data['date'], data['percentage'], marker='o', linestyle='-')
    plt.title(f"Percentage Over Time for {name}")
    plt.xlabel('Date')
    plt.ylabel('Percentage')
    safe_name = name.replace(' ', '_').replace('/', '-')
    filename = f'{graph_folder}/{folder}/line_{safe_name}.png'
    plt.savefig(filename)
    plt.close()

    filenames.append(filename)
    names.append(name)
    
# Loop through each CSV file
for file in csv_files:
    df = pd.read_csv(f'{data_folder}/{file}.csv', parse_dates=['date'])
    
    filenames = []
    names = []

    # Group by 'name' and plot each group
    grouped = df.groupby('name')
    for name, group in grouped:
        plot_and_save(group, name, file)

    with open(f'{graph_folder}/{file}_filename.txt', 'w') as f:
        for filename in filenames:
            f.write(filename + '\n')

    with open(f'{graph_folder}/{file}_name.txt', 'w') as f:
        for name in names:
            f.write(name + '\n')

