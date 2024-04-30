import pandas as pd
import matplotlib.pyplot as plt
import os
# Get the directory of the script
script_directory = os.path.dirname(os.path.abspath(__file__))

# Change the current working directory
os.chdir(script_directory)

# Load in gpu csv data
gpus = pd.read_csv('data/gpus.csv', parse_dates=['date'])

# Subset the data so it only includes the top ten highest percentage column per month
gpus_top_ten = gpus.groupby('date').apply(lambda x: x.nlargest(10, 'percentage')).reset_index(drop=True)

gpus_top_ten.set_index('date', inplace=True)

def plot_and_save(data, column, title, filename, directory):

    data = data.sort_values(by=column, ascending=False)
    if len (data) < 5:
        return
    
    if (data[column] == 0).sum() > 2:
        return

    plt.style.use('dark_background')
    plt.figure(figsize=(10, 8))
    plt.barh(data['name'], data[column], color='lime')
    plt.axvline(x=0, color='white', linestyle='-')
    plt.xlabel(column.title())
    plt.title(title)
    plt.gca().invert_yaxis()

    plt.tight_layout()

    plt.savefig(f'{directory}/{filename}')

    plt.close()

# GPU Graphs
for (year, month), group in gpus_top_ten.groupby([gpus_top_ten.index.year, gpus_top_ten.index.month]):
    # Filter data for the month
    monthdata = group.sort_values(by='name')

    # Create a directory for the month
    directory = f'graphs/gpus'

    # Plot for 'change'
    plot_title = f'Change for {year}-{month:02d}'
    filename = f'change{year}-{month:02d}.png'
    plot_and_save(monthdata, 'change', plot_title, filename, directory)

    # Plot for 'percentage'
    plot_title = f'Percentage for {year}-{month:02d}'
    filename = f'percentage{year}-{month:02d}.png'
    plot_and_save(monthdata, 'percentage', plot_title, filename, directory)

    break


# CPU Speed Graphs
cpus = pd.read_csv('data/cpus.csv', parse_dates=['date'])

cpus.set_index('date', inplace=True)

for (year, month), group in cpus.groupby([cpus.index.year, cpus.index.month]):
    # Filter data for the month
    monthdata = group.sort_values(by='name')

    # Create a directory for the month
    directory = f'graphs/cpus'

    # Plot for 'change'
    plot_title = f'Change for {year}-{month:02d}'
    filename = f'change{year}-{month:02d}.png'
    plot_and_save(monthdata, 'change', plot_title, filename, directory)

    # Plot for 'percentage'
    plot_title = f'Percentage for {year}-{month:02d}'
    filename = f'percentage{year}-{month:02d}.png'
    plot_and_save(monthdata, 'percentage', plot_title, filename, directory)

    break



# Display Res Graphs
display_res = pd.read_csv('data/display_res.csv', parse_dates=['date'])

display_res.set_index('date', inplace=True)

for (year, month), group in display_res.groupby([display_res.index.year, display_res.index.month]):
    # Filter data for the month
    monthdata = group.sort_values(by='name')

    # Create a directory for the month
    directory = f'graphs/display_res'

    # Plot for 'change'
    plot_title = f'Change for {year}-{month:02d}'
    filename = f'change{year}-{month:02d}.png'
    plot_and_save(monthdata, 'change', plot_title, filename, directory)

    # Plot for 'percentage'
    plot_title = f'Percentage for {year}-{month:02d}'
    filename = f'percentage{year}-{month:02d}.png'
    plot_and_save(monthdata, 'percentage', plot_title, filename, directory)

    break




# HD Graphs
hd = pd.read_csv('data/hd.csv', parse_dates=['date'])

hd.set_index('date', inplace=True)

for (year, month), group in hd.groupby([hd.index.year, hd.index.month]):
    # Filter data for the month
    monthdata = group.sort_values(by='name')

    # Create a directory for the month
    directory = f'graphs/hd'

    # Plot for 'change'
    plot_title = f'Change for {year}-{month:02d}'
    filename = f'change{year}-{month:02d}.png'
    plot_and_save(monthdata, 'change', plot_title, filename, directory)

    # Plot for 'percentage'
    plot_title = f'Percentage for {year}-{month:02d}'
    filename = f'percentage{year}-{month:02d}.png'
    plot_and_save(monthdata, 'percentage', plot_title, filename, directory)

    break






# Physical CPUs Graphs
physical_cpus = pd.read_csv('data/physical_cpus.csv', parse_dates=['date'])

physical_cpus.set_index('date', inplace=True)

for (year, month), group in physical_cpus.groupby([physical_cpus.index.year, physical_cpus.index.month]):
    # Filter data for the month
    monthdata = group.sort_values(by='name')

    # Create a directory for the month
    directory = f'graphs/physical_cpus'

    # Plot for 'change'
    plot_title = f'Change for {year}-{month:02d}'
    filename = f'change{year}-{month:02d}.png'
    plot_and_save(monthdata, 'change', plot_title, filename, directory)

    # Plot for 'percentage'
    plot_title = f'Percentage for {year}-{month:02d}'
    filename = f'percentage{year}-{month:02d}.png'
    plot_and_save(monthdata, 'percentage', plot_title, filename, directory)

    break


# RAM Graphs
ram = pd.read_csv('data/ram.csv', parse_dates=['date'])

ram.set_index('date', inplace=True)

for (year, month), group in ram.groupby([ram.index.year, ram.index.month]):
    # Filter data for the month
    monthdata = group.sort_values(by='name')

    # Create a directory for the month
    directory = f'graphs/ram'

    # Plot for 'change'
    plot_title = f'Change for {year}-{month:02d}'
    filename = f'change{year}-{month:02d}.png'
    plot_and_save(monthdata, 'change', plot_title, filename, directory)

    # Plot for 'percentage'
    plot_title = f'Percentage for {year}-{month:02d}'
    filename = f'percentage{year}-{month:02d}.png'
    plot_and_save(monthdata, 'percentage', plot_title, filename, directory)

    break



# VRAM Graphs
vram = pd.read_csv('data/vram.csv', parse_dates=['date'])

vram.set_index('date', inplace=True)

for (year, month), group in vram.groupby([vram.index.year, vram.index.month]):
    # Filter data for the month
    monthdata = group.sort_values(by='name')

    # Create a directory for the month
    directory = f'graphs/vram'

    # Plot for 'change'
    plot_title = f'Change for {year}-{month:02d}'
    filename = f'change{year}-{month:02d}.png'
    plot_and_save(monthdata, 'change', plot_title, filename, directory)

    # Plot for 'percentage'
    plot_title = f'Percentage for {year}-{month:02d}'
    filename = f'percentage{year}-{month:02d}.png'
    plot_and_save(monthdata, 'percentage', plot_title, filename, directory)

    break