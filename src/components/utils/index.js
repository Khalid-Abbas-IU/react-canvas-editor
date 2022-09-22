export const setArrowAlignment = (x2, y2, tempVal) => {
    if (tempVal === -1.57) {
        // 90 degrees
        x2 = x2 - 2
    }
    else if (-1.57 < tempVal && tempVal < 0) {
        // between 0 and 90 degrees
        x2 = x2 - 1.75;
        y2 = y2 - 2;
    }
    else if (tempVal < -1.57) {
        // between 90 and 180 degrees
        y2 = y2 + 2;
        x2 = x2 - 1.75;
    }
    else if (tempVal <= 3.14 && tempVal > 1.57) {
        // between 180 and 270 degrees
        x2 = x2 + 1.75;
        y2 = y2 + 2;
    }
    else if (tempVal === 1.57) {
        // 360 degrees
        x2 = x2 + 2;
    }
    else {
        x2 = x2 + 2;
        y2 = y2 - 2;
    }

    return {
        x2, y2
    }
}