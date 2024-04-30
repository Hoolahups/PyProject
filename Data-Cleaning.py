# Load in shs.csv data
import pandas as pd
import os

# Set working directory
os.chdir(os.path.dirname(os.path.abspath(__file__)))

# Read in CSV shs
shs = pd.read_csv('shs.csv')
print(shs.head())

# Create new csv only containing observations with category = 'Video Card Description'
shs_video_card = shs[shs['category'] == 'Video Card Description']
shs_video_card.to_csv('data/gpus.csv', index=False)

# Create new csv only containing observations with category = 'AMD CPU Speeds' and 'Intel CPU Speeds'
shs_cpu_speeds = shs[(shs['category'] == 'AMD CPU Speeds') | (shs['category'] == 'Intel CPU Speeds')]

# Change all category names to 'CPU Speeds'
shs_cpu_speeds['category'] = 'CPU Speeds'

# All observations where the date and name columns are the same, combine them but add change and percentage together
shs_cpu_speeds = shs_cpu_speeds.groupby(['date', 'name']).agg({'change': 'sum', 'percentage': 'sum'}).reset_index()

shs_cpu_speeds.to_csv('data/cpus.csv', index=False)

# Create new csv only containing observations with category = 'Physical CPUs'
shs_physical_cpus = shs[shs['category'] == 'Physical CPUs']
shs_physical_cpus.to_csv('data/physical_cpus.csv', index=False)

# Create new csv only containing observations with category = 'Primary Display Resolution'
shs_primary_display_res = shs[shs['category'] == 'Primary Display Resolution']
shs_primary_display_res.to_csv('data/display_res.csv', index=False)

# Create new csv only containing observations with category = 'System RAM'
shs_system_ram = shs[shs['category'] == 'System RAM']
shs_system_ram.to_csv('data/ram.csv', index=False)

# Create new csv only containing observations with category = 'Total Hard Drive Space'
shs_total_hard_drive_space = shs[shs['category'] == 'Total Hard Drive Space']
shs_total_hard_drive_space.to_csv('data/hd.csv', index=False)

# Create new csv only containing observations with category = 'VRAM'
shs_vram = shs[shs['category'] == 'VRAM']
shs_vram.to_csv('data/vram.csv', index=False)