# jellyFishTest
Jellyfish Challenge

The Jellyfish tank can be modelled by a rectangular grid around which Jellyfish can move according to instructions provided by the Tank IR Remote Control. You are to write a program that determines each sequence of Jellyfish positions and reports the final position of the Jellyfish. A Jellyfish position consists of a grid coordinate (a pair of integers: x-coordinate followed by y-coordinate) and an orientation (N, S, E, W for north, south, east, and west).
The Input
The first line of input is the upper-right coordinates of the rectangular tank, the lower-left coordinates are assumed to be 0, 0. The remaining input consists of a sequence of jellyfish positions and instructions (two lines per jellyfish). A position consists of two integers specifying the initial coordinates of the jellyfish and an orientation (N, S, E, W), all separated by whitespace on one line. A jellyfish instruction is a string of the letters “L”, “R”, and “F” on one line.

Each jellyfish is processed sequentially, i.e., it finishes executing the jellyfish instructions before the next jellyfish begins execution. The maximum value for any coordinate is 60. All instruction strings will be less than 100 characters in length.

The Output For each jellyfish position/instruction in the input, the output should indicate the jellyfish's final grid position and orientation. If a jellyfish falls off the edge of the grid, the word “LOST” should be printed after the position and orientation.
