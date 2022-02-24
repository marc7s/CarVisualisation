# The problem

This is a visualisation for an algorithm explained by a lecturer in a course for discrete mathematics. The problem was the following:
> Consider the integer number line. A car starts at an unknown position on the line at time 0, with an unknown constant (integer) velocity. Every second, the car moves according to its velocity to land on a new (or the same if the velocity is 0) number. Every second, you are allowed to pick any number on the line to photograph. Is there an algorithm for which number to photograph that guarantees that the car will be caught on photo?

The answer, as you could have guessed, is yes. That algorithm is visualised in this simple website.

# The algorithm

The algorithm presented by the lecturer is the following:
> Consider the 2D domain (Z, Z), integer pairs. The first is the car's starting position, the second its speed. `(0, 0)` corresponds to the car starting at 0 with speed 0. `(23, -67)` the car starting at 23 with speed -67 (moving left) and so on. Each second, you will take as input to your algorithm the next pair so that if the algorithm is run to infinity, all pairs will be visited. This means you start at `(0, 0)` and visit the pairs in a circular motion, as shown in the visualisation. Now consider the function `f` that at any point in time `t` returns the number you should photograph. With an arbitrary input parameter `(s, v)`, the function is defined as `f((s, v), t) = s + v*t`.

As you can see, the algoritm calculates the position the car would have reached at this moment, given a guess of its parameters. Since we iterate over all parameters to infinity, we are guaranteed to photograph the car at some point.

The visualisation shows the 2D domain and the function as `t` progresses from 0, with the car in the position it would have at that moment given those parameters.