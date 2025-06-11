```python

import numpy as np
import matplotlib.pyplot as plt
import matplotlib.animation as animation
from matplotlib.widgets import Slider
import tkinter as tk
from tkinter import ttk

class MolecularSimulator:
    def __init__(self, n_particles=20, box_size=10.0):
        self.n_particles = n_particles
        self.box_size = box_size
        
        # Initialize random positions and velocities
        self.positions = np.random.uniform(1, box_size-1, (n_particles, 2))
        self.velocities = np.random.uniform(-0.5, 0.5, (n_particles, 2))
        
        # Lennard-Jones parameters
        self.epsilon = 1.0  # Depth of potential well
        self.sigma = 0.5    # Distance at which potential is zero
        self.mass = 1.0
        self.dt = 0.01
        
        # For energy tracking
        self.kinetic_energies = []
        self.potential_energies = []
        self.total_energies = []
        
    def lennard_jones_force(self, r):
        """Calculate Lennard-Jones force magnitude"""
        if r < 0.1:  # Avoid division by zero
            r = 0.1
        
        force_magnitude = 24 * self.epsilon * (2 * (self.sigma/r)**12 - (self.sigma/r)**6) / r
        return force_magnitude
    
    def calculate_forces(self):
        """Calculate forces on all particles"""
        forces = np.zeros_like(self.positions)
        potential_energy = 0
        
        for i in range(self.n_particles):
            for j in range(i + 1, self.n_particles):
                # Distance vector
                dr = self.positions[j] - self.positions[i]
                r = np.linalg.norm(dr)
                
                if r < 3.0:  # Cutoff distance
                    # Force magnitude
                    f_mag = self.lennard_jones_force(r)
                    
                    # Force vector (unit vector * magnitude)
                    force_vec = f_mag * dr / r
                    
                    forces[i] += force_vec
                    forces[j] -= force_vec
                    
                    # Add to potential energy
                    potential_energy += 4 * self.epsilon * ((self.sigma/r)**12 - (self.sigma/r)**6)
        
        return forces, potential_energy
    
    def update(self):
        """Update particle positions using Verlet integration"""
        forces, potential_energy = self.calculate_forces()
        
        # Update velocities
        self.velocities += forces / self.mass * self.dt
        
        # Update positions
        self.positions += self.velocities * self.dt
        
        # Handle boundary conditions (periodic)
        self.positions = self.positions % self.box_size
        
        # Calculate kinetic energy
        kinetic_energy = 0.5 * self.mass * np.sum(self.velocities**2)
        
        # Store energies
        self.kinetic_energies.append(kinetic_energy)
        self.potential_energies.append(potential_energy)
        self.total_energies.append(kinetic_energy + potential_energy)
        
        # Keep only last 500 points for plotting
        if len(self.kinetic_energies) > 500:
            self.kinetic_energies.pop(0)
            self.potential_energies.pop(0)
            self.total_energies.pop(0)

class MolecularGUI:
    def __init__(self):
        self.root = tk.Tk()
        self.root.title("Molecular Interaction Simulator")
        self.root.geometry("800x600")
        
        # Create simulator
        self.sim = MolecularSimulator()
        
        # Create matplotlib figure
        self.fig, (self.ax1, self.ax2) = plt.subplots(1, 2, figsize=(12, 5))
        
        # Setup particle plot
        self.ax1.set_xlim(0, self.sim.box_size)
        self.ax1.set_ylim(0, self.sim.box_size)
        self.ax1.set_aspect('equal')
        self.ax1.set_title('Molecular Dynamics Simulation')
        self.ax1.set_xlabel('X Position')
        self.ax1.set_ylabel('Y Position')
        
        # Setup energy plot
        self.ax2.set_title('Energy vs Time')
        self.ax2.set_xlabel('Time Steps')
        self.ax2.set_ylabel('Energy')
        
        # Initialize plots
        self.particles, = self.ax1.plot([], [], 'bo', markersize=8, alpha=0.7)
        self.ke_line, = self.ax2.plot([], [], 'r-', label='Kinetic Energy')
        self.pe_line, = self.ax2.plot([], [], 'b-', label='Potential Energy') 
        self.te_line, = self.ax2.plot([], [], 'g-', label='Total Energy')
        self.ax2.legend()
        
        # Control panel
        control_frame = ttk.Frame(self.root)
        control_frame.pack(pady=10)
        
        # Temperature control
        ttk.Label(control_frame, text="Temperature:").grid(row=0, column=0, padx=5)
        self.temp_var = tk.DoubleVar(value=1.0)
        temp_scale = ttk.Scale(control_frame, from_=0.1, to=3.0, variable=self.temp_var, 
                              orient='horizontal', length=200, command=self.update_temp_label)
        temp_scale.grid(row=0, column=1, padx=5)
        self.temp_label = ttk.Label(control_frame, text="1.0")
        self.temp_label.grid(row=0, column=2, padx=5)
        
        # Interaction strength control
        ttk.Label(control_frame, text="Interaction Strength:").grid(row=1, column=0, padx=5)
        self.epsilon_var = tk.DoubleVar(value=1.0)
        epsilon_scale = ttk.Scale(control_frame, from_=0.1, to=2.0, variable=self.epsilon_var,
                                 orient='horizontal', length=200, command=self.update_epsilon_label)
        epsilon_scale.grid(row=1, column=1, padx=5)
        self.epsilon_label = ttk.Label(control_frame, text="1.0")
        self.epsilon_label.grid(row=1, column=2, padx=5)
        
        # Buttons
        button_frame = ttk.Frame(self.root)
        button_frame.pack(pady=10)
        
        self.start_button = ttk.Button(button_frame, text="Start Simulation", 
                                      command=self.start_simulation)
        self.start_button.pack(side='left', padx=5)
        
        self.stop_button = ttk.Button(button_frame, text="Stop Simulation", 
                                     command=self.stop_simulation)
        self.stop_button.pack(side='left', padx=5)
        
        self.reset_button = ttk.Button(button_frame, text="Reset", 
                                      command=self.reset_simulation)
        self.reset_button.pack(side='left', padx=5)
        
        # Info label
        self.info_label = ttk.Label(self.root, text="Click 'Start Simulation' to begin")
        self.info_label.pack(pady=5)
        
        self.animation = None
        self.running = False
        
        # Embed matplotlib in tkinter
        from matplotlib.backends.backend_tkagg import FigureCanvasTkAgg
        self.canvas = FigureCanvasTkAgg(self.fig, self.root)
        self.canvas.get_tk_widget().pack(fill='both', expand=True)
    
    def update_temp_label(self, value):
        """Update temperature label"""
        self.temp_label.config(text=f"{float(value):.1f}")
    
    def update_epsilon_label(self, value):
        """Update epsilon label"""
        self.epsilon_label.config(text=f"{float(value):.1f}")
        
    def animate(self, frame):
        if self.running:
            # Update simulation parameters
            self.sim.epsilon = self.epsilon_var.get()
            
            # Scale velocities for temperature control
            current_ke = 0.5 * np.sum(self.sim.velocities**2)
            if current_ke > 0:
                target_ke = self.temp_var.get() * self.sim.n_particles
                scale_factor = np.sqrt(target_ke / current_ke)
                self.sim.velocities *= scale_factor * 0.99  # Gradual adjustment
            
            # Update simulation
            self.sim.update()
            
            # Update particle positions
            self.particles.set_data(self.sim.positions[:, 0], self.sim.positions[:, 1])
            
            # Update energy plots
            if len(self.sim.kinetic_energies) > 1:
                time_steps = range(len(self.sim.kinetic_energies))
                self.ke_line.set_data(time_steps, self.sim.kinetic_energies)
                self.pe_line.set_data(time_steps, self.sim.potential_energies)
                self.te_line.set_data(time_steps, self.sim.total_energies)
                
                # Auto-scale energy plot
                self.ax2.relim()
                self.ax2.autoscale_view()
            
            # Update info
            avg_ke = np.mean(self.sim.kinetic_energies[-10:]) if self.sim.kinetic_energies else 0
            avg_pe = np.mean(self.sim.potential_energies[-10:]) if self.sim.potential_energies else 0
            self.info_label.config(text=f"KE: {avg_ke:.2f}, PE: {avg_pe:.2f}, T: {self.temp_var.get():.1f}")
        
        return self.particles, self.ke_line, self.pe_line, self.te_line
    
    def start_simulation(self):
        self.running = True
        if self.animation is None:
            self.animation = animation.FuncAnimation(self.fig, self.animate, 
                                                   interval=50, blit=False, repeat=True,
                                                   cache_frame_data=False)
        self.canvas.draw()
    
    def stop_simulation(self):
        self.running = False
    
    def reset_simulation(self):
        self.running = False
        self.sim = MolecularSimulator()
        
        # Clear plots
        self.particles.set_data([], [])
        self.ke_line.set_data([], [])
        self.pe_line.set_data([], [])
        self.te_line.set_data([], [])
        self.canvas.draw()
        
        self.info_label.config(text="Simulation reset. Click 'Start Simulation' to begin")
    
    def run(self):
        # Start tkinter main loop (matplotlib is now embedded)
        self.root.mainloop()

def main():
    """Main function to run the molecular simulation"""
    print("Starting Molecular Interaction Simulator...")
    print("This simulation demonstrates Lennard-Jones interactions between molecules")
    print("Controls:")
    print("- Temperature: Controls average kinetic energy of particles")
    print("- Interaction Strength: Controls the strength of intermolecular forces")
    print("- Start/Stop: Control simulation")
    print("- Reset: Reinitialize particles")
    
    app = MolecularGUI()
    app.run()

if __name__ == "__main__":
    main()

```
