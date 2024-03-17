## TODO

Features:

- cell state 
    - color
        - button for each color
- line drawing
- selection / focus
    - click to focus
    - multi-select

State management:

- undo / redo
- checkpoints
- prepared games
- save game
- state management API

goodmorning.computer:

- server
    - users
    - games

### DESIGN

An SVG.js Sudoku board wrapped in a React app. 

**Models**: Cell, Grid, Selection, Line (special rule illustrations)

**View**: Cell, Grid, Controls

**Controller**: Game

#### FACTS

Cells know when they are acted on. 

Cells know their neighbors.

A Selection is a collection of cells with colored border.

Grid has state.

- focus: Cell under cursor
- selected: cells in selection list

Cell has state.

- selected

Ways of entering numbers: 
- pencil `number[]`: maybes
- value `number`: definitely / answer
- fixed `number`: puzzle setup

Rule evaluation goes rows, columns, blocks.
 
