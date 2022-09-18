import {fabric} from "fabric";

// Override Functions

fabric.Object.prototype.set({
    // borderColor: '#9eba1b',
    cornerColor: '#333333',
    borderColor: '#333333',
    cornerSize: 12,
    cornerStyle: 'circle',
});


fabric.Object.prototype.setControlsVisibility({
    tl: false,
    tr: false,
    br: true,
    bl: false,
    ml: false,
    mt: false,
    mr: false,
    mb: false,
    mtr: true,
});
