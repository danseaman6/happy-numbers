"Happy Numbers" Project completed for Crayon.

Project prompt was the create a tool for the Happy Number game, where the user must find a number ABC where A! + B! + C! = ABC (where A is the first digit of the number, B is the second, and C is the third).

This implementation will validate inputs and offer the user the correct answer after 3 incorrect attempts. 

I'm bad at CSS, so I relied pretty heavily on importing BootStrap CSS for this page. Fortunately making use of the Container, Row, and Col components allows me to handle page resizing, so that can all be taken car of in a much simpler sense.
(On that note, the number entry form itself could be split into pieces to respond better to very small screens. I just liked how it looked on one line.)

The only dependency is react bootstrap. The app was starting with react-create-app. I handled the factorial math with a while-loop rather than recursion, since I'd rather the page hold 2 variables for a long period of time than make potentially infinite nested function calls.
