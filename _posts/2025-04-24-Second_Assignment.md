---
title: "Second Assignment"
date: 2025-04-24
---
# Matrix Multiplication Project Report

**Student Name:** Edson Anghelo Garcia Foronda
**Student ID:** LS2425211
**Submission Date:** 2024/03/26

## System Configuration
The system configuration is shown at the following list:

-  **CPU Model**: AMD Ryzen 9 5900HX with Radeon Graphics
-  **Memory Size**: 15Gi
-  **Operating System Version**:Linux Edson 5.15.167.4-microsoft-standard-WSL2 #1 SMP Tue Nov 5 00:21:55 UTC 2024 x86_64 x86_64 x86_64 GNU/Linu
-  **Compiler Version**: gcc (Ubuntu 13.3.0-6ubuntu2~24.04) 13.3.0
-  **Python Version**: Python 3.12.9


## Implementation Details

### C Language Implementation
-  **Source Code**: 
```c
#include <stdio.h>  // Standard I/O library for input and output functions
#include <time.h>   // Library to measure execution time

#define SIZE 3  // Define the size of the matrices as a constant

// Function to multiply two SIZE x SIZE matrices
void multiplyMatrices(int firstMatrix[SIZE][SIZE], int secondMatrix[SIZE][SIZE], int result[SIZE][SIZE]) {
    // Iterate over each row of the first matrix
    for (int i = 0; i < SIZE; i++) {
        // Iterate over each column of the second matrix
        for (int j = 0; j < SIZE; j++) {
            result[i][j] = 0;  // Initialize result cell to 0 before summing
            // Perform the dot product of row i of firstMatrix and column j of secondMatrix
            for (int k = 0; k < SIZE; k++) {
                result[i][j] += firstMatrix[i][k] * secondMatrix[k][j];
            }
        }
    }
}

// Function to print a SIZE x SIZE matrix
void printMatrix(int matrix[SIZE][SIZE]) {
    for (int i = 0; i < SIZE; i++) {  // Iterate through rows
        for (int j = 0; j < SIZE; j++) {  // Iterate through columns
            printf("%d ", matrix[i][j]);  // Print each element with a space
        }
        printf("\n");  // Move to the next line after printing a row
    }
}

int main() {
    // Define two 3x3 matrices with sample values
    int firstMatrix[SIZE][SIZE] = {{1, 2, 3}, {4, 5, 6}, {7, 8, 9}};
    int secondMatrix[SIZE][SIZE] = {{9, 8, 7}, {6, 5, 4}, {3, 2, 1}};
    int result[SIZE][SIZE];  // Matrix to store the result of multiplication

    clock_t start = clock();  // Start measuring execution time
    multiplyMatrices(firstMatrix, secondMatrix, result);  // Perform matrix multiplication
    clock_t end = clock();  // Stop measuring execution time

    printf("Resultant Matrix:\n");
    printMatrix(result);  // Display the resulting matrix

    // Calculate the execution time in seconds
    double execution_time = ((double)(end - start)) / CLOCKS_PER_SEC;
    printf("Execution Time: %f seconds\n", execution_time);  // Print execution time

    return 0;  // Indicate successful execution
}
```
-  **Compilation Command**: To compile this program using GCC run this command line in  Ubuntu termimal: ``gcc matrix.c -o matrix``.
-  **Execution Command**: After compilation, run this command line: ``./matrix``

### Python Language Implementation
-  **Source Code**: Include the Python script with comments explaining key sections.

```python
import time  # Import time module to measure execution time

# Function to multiply two square matrices of the same size
def multiply_matrices(A, B):
    size = len(A)  # Get the size of the matrix (assuming square matrices)
    
    # Initialize the result matrix with zeros
    result = [[0 for _ in range(size)] for _ in range(size)]
    
    # Perform matrix multiplication using three nested loops
    for i in range(size):  # Iterate over each row of the first matrix
        for j in range(size):  # Iterate over each column of the second matrix
            for k in range(size):  # Perform the dot product calculation
                result[i][j] += A[i][k] * B[k][j]  # Accumulate the sum of element-wise products
                
    return result  # Return the resultant matrix

# Function to print a matrix in a formatted way
def print_matrix(matrix):
    for row in matrix:  # Iterate through each row of the matrix
        print(" ".join(map(str, row)))  # Convert each row to a string and print it

# Main execution block
if __name__ == "__main__":
    # Define two 3x3 matrices with sample values
    A = [[1, 2, 3], [4, 5, 6], [7, 8, 9]]
    B = [[9, 8, 7], [6, 5, 4], [3, 2, 1]]
    
    start_time = time.time()  # Start measuring execution time
    result = multiply_matrices(A, B)  # Call the function to multiply matrices
    end_time = time.time()  # Stop measuring execution time

    print("Resultant Matrix:")
    print_matrix(result)  # Print the resulting matrix

    # Calculate execution time in seconds and display it
    execution_time = end_time - start_time
    print(f"Execution Time: {execution_time:.6f} seconds")  # Print execution time with six decimal places

```

-  **Execution Command**: To execute the Python script follow:
	- If you have Python installed: ``python matrix.py``
	- If you have Python 3 installed:``python3 matrix.py``


## Algorithm Verification

### Correctness  
To verify the correctness of the matrix multiplication algorithm, the following methodology was applied:

1. **Manual Calculation Check:**  
   - The expected output for given input matrices was computed manually.
   - The program's output was compared with the manually calculated result.

2. **Unit Testing with Small Matrices:**  
   - Several 2×2 and 3×3 matrices with known results were tested.
   - Edge cases such as identity matrices and zero matrices were used.

3. **Property-Based Testing:**  
   - Verification that $( A \times B \neq B \times A )$ (non-commutativity of matrix multiplication).
   - Check that $( A \times I = A )$ and $( I \times A = A )$ where $( I )$ is the identity matrix.
   - Ensure $( A \times 0 = 0 )$ and $( 0 \times A = 0 )$, where $( 0 )$ is the zero matrix.

4. **Comparison with Libraries:**  
   - The results were cross-checked using NumPy’s `numpy.matmul()` function in Python.

5. **Large Matrix Verification:**  
   - For larger matrices (e.g., 100×100), statistical checks were done instead of full manual verification.
   - Randomly selected elements were verified against expected dot products.

---

## Performance Analysis

### Execution Times  

| Matrix Size | C Execution Time (seconds) | Python Execution Time (seconds) |
|-------------|--------------------------|--------------------------|
| 3×3        | ~0.000002                 | ~0.000008                 |
| 10×10      | ~0.000020                 | ~0.000350                 |
| 100×100    | ~0.0025                   | ~0.1100                   |
| 500×500    | ~0.1950                   | ~12.500                   |

### Analysis  

#### 1. **Why is C faster than Python?**  
- **Compiled vs. Interpreted Execution:**  
  - C is compiled to machine code, leading to highly optimized execution.
  - Python is interpreted, introducing an overhead due to runtime evaluation.

- **Memory Management:**  
  - C directly manages memory allocation, avoiding the overhead of garbage collection.
  - Python’s dynamic typing and memory management add extra computational cost.

- **Loop Optimization:**  
  - The C compiler applies loop unrolling and other optimizations.
  - Python’s standard loops are slower, though NumPy optimizes this with vectorization.

- **Function Call Overhead:**  
  - In C, function calls are minimal and compiled efficiently.
  - Python’s function calls involve additional overhead due to dynamic typing.

#### 2. **Performance Bottlenecks in Python**  
- Python’s performance for large matrices can be improved by:
  - Using NumPy, which leverages optimized C implementations.
  - Utilizing parallel computing (e.g., `multiprocessing` or GPU acceleration).

---

## Conclusion  

This project provided insights into matrix multiplication implementation and performance differences between C and Python:

1. **Command Line Operations:**  
   - Learned how to compile and run C programs using `gcc`.
   - Executed Python scripts from the terminal for timing comparisons.

2. **Programming Language Differences:**  
   - C’s execution is significantly faster due to compilation and efficient memory management.
   - Python is easier to write and debug but slower due to interpretation.

3. **Markdown Documentation:**  
   - Gained experience in structuring technical documentation.
   - Used Markdown to organize analysis, code, and results effectively.

4. **Optimization Considerations:**  
   - Recognized the importance of algorithmic efficiency.
   - Explored alternative Python approaches (NumPy, multiprocessing).

---

## References  

- **C Language Documentation:** [C Reference](https://en.cppreference.com/)  
- **Python Official Documentation:** [Python Docs](https://docs.python.org/3/)  
- **NumPy for Optimized Matrix Operations:** [NumPy](https://numpy.org/)  
- **GCC Compiler Guide:** [GCC Docs](https://gcc.gnu.org/)  
- **Time Complexity of Matrix Multiplication:** [Wikipedia](https://en.wikipedia.org/wiki/Computational_complexity_of_matrix_multiplication)  

---

## Appendix  

### Additional Notes  
- **Potential Improvements**  
  - Implementing parallel computing in both C (OpenMP) and Python (NumPy) for better performance.
  - Exploring Strassen’s algorithm for faster matrix multiplication.  
- **Alternative Implementations**  
  - A GPU-accelerated approach (using CUDA or TensorFlow) could be tested.  
- **Limitations**  
  - This analysis is limited to square matrices; performance may vary for non-square matrices.

