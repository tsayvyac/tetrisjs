# TetrisJS
![HTML5](https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/css3-%231572B6.svg?style=for-the-badge&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)

## Initial project description
TetrisJS would consist of several pages, such as a home page with help and the option to start a new game, a game page with the current game field and game statistics, and a results page that would show the best score achieved. Tetris functionality includes:
- [x] Movement and rotation of tetrominoes
- [x] Hard drop [^3]
- [x] Display statistics such as total score, best score
- [x] Sound and visual effects.

## Documentation
The implementation of the Tetris[^1] game involves the use of several web development technologies, including HTML, CSS, and JavaScript following the Model-View-Controller (MVC) pattern, where [Tetris.js](/scripts/game/Tetris.js) is the model. The project also uses JS API Localstorage to save records in the browser (saves only first 10 records). The canvas HTML tag was used to draw the playing field, figures and game statistics.

### How to play

You will need a keyboard to play TetrisJS <br>
Keys:
- ⬅️ - move tetromino left
- ➡️ - move tetromino right
- ⬇️ - move tetromino down
- ⬆️ - rotate tetromino
- [space] - hard drop

Line clear scores[^4]:
| Line clear | Points |
|------------|--------|
| 1 (single) | 40     |
| 2 (double) | 100    |
| 3 (triple) | 300    |
| 4 (tetris) | 1200   |

Depending on the number of points, the game speed and level increase. More level, more bonus points.<br>
$speed = 1000 - (level * 100)$<br>
$score += lineClear * (level + 1)$

On some screens you may see red letters in square brackets (e.g. Pl[a]y Tetris) that are hotkeys. When you press such a letter on the keyboard, a certain action will occur. There are sound effects that can be turned on and off

### SRS (Super rotation system) [^2]
Visualisation of implementation SRS
![Visualisation](/img/SRS.gif)

### References
[^1]: [Tetris Wiki](https://tetris.fandom.com/wiki/Tetris_Wiki)
[^2]: [Super Rotation System](https://tetris.fandom.com/wiki/SRS)
[^3]: [Hard drop](https://tetris.fandom.com/wiki/Hard_Drop)
[^4]: [Scoring](https://tetris.wiki/Scoring)
