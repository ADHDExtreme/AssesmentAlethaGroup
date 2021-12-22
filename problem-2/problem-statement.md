### Problem Statement
Consider the following is a list of numbers:

3 5 8 9 5 6 10 11

Each pair of numbers is an (x, y) coordinate (e.g., 3, 5 is (3, 5), and
8, 9 is (8, 9), but 5, 8 is not a pair).  In this manner, the entire list
can be parsed into a list of (x, y) points as follows:

(3, 5), (8, 9), (5, 6), (10, 11)

Now, consider each pair of these ordered pairs of coordinates:  the first describes
the lower-left corner of a rectangle on the cartesian plane and the second describes
an upper-right corner of a rectangle on the cartesian plane.  For example, one rectangle
is described by ((3, 5), (8, 9)) and another by ((5, 6), (10, 11)).

The task is:  determine the area of the intersection of all rectangles for an arbitrary
input list of positive integers, which may be odd or even.  Note that this is the area
of the intersection of all rectangles, not the total area of all intersections.
As an example, if there are three rectangles and only two overlap, then the area of
intersection is 0 because there's a rectangle in the set of input rectangles not overlapping
the rest.  It would be a plus if your program could read the list from STDIN and process it as
values appear, rather than requiring the entire list up front as input.

### Other requirements
- Must target Linux x86_64, macOS x86_64, or WSL 2.
- Must be coded in any of the following languages:  JavaScript, TypeScript, Python, Rust, C or C++
- Programs must not assume that the input fits in memory!

### Some considerations
- Comment your code in a helpful way that balances clarity over verbosity.
- Consider supplying a separate manifest for depedencies (e.g., if you write python, consider supplying a requirements file).  The
user should have minimum friction executing your code.
