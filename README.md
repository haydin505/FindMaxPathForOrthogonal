## General Info

This project finds the maximum sum of the numbers in a single path for a given orthogonal triangle.

### Logic

- Let's assume that number of rows and columns are 15.
- Take starting point as 14th row and first column (Array notation: [13,0]).
- Take starting point and left side of the tree (Array notation: [14,0]) and add them together; let's assume that sum equals to "X".
- Take starting point and right side of the tree (Array notation: [14,1]) and add them together; let's assume that sum equals to "Y".
- If X greater than Y, switch starting point (Array notation: [13,0]) with X (Array notation: [14,0]), and vice versa.
- Apply this rule until you reach top of the triangle, and take the top element as result of the problem.
