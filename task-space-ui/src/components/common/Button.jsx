import React from 'react';
import classNames from 'classnames';


const Button = (
    {
        children, primary, secondary, success, warning, danger, outlined, rounded, ...allEventHandlers
    }
) => {


    const classes = classNames(allEventHandlers.className, 'px-3 py-1.5 border flex flex-row items-center', {
        "border-blue-600 bg-blue-500 text-white": primary && !outlined,
        "border-gray-900 bg-gray-700 text-white": secondary && !outlined,
        "border-green-600 bg-green-500 text-white": success && !outlined,
        "border-red-600 bg-red-500 text-white": danger && !outlined,
        "border-yellow-600 bg-yellow-500 text-white": warning && !outlined,
        "rounded-full": rounded,
        "bg-white border-blue-600 text-blue-500": outlined && primary,
        "bg-white text-gray-700 border-gray-900": outlined && secondary,
        "bg-white border-green-600 text-green-500": outlined && success,
        "bg-white border-red-600 text-red-500": outlined && danger,
        "bg-white border-yellow-600 text-yellow-400": outlined && warning,

    })


    return (
        <button {...allEventHandlers} className={classes}>{children}</button>
    );
};


Button.propTypes = {
    checkVariationValue: ({ primary, secondary, success, warning, danger }) => {

        const count = Number(!!primary) + Number(!!secondary) + Number(!!warning) + Number(!!success) + Number(!!danger);
        if (count > 1) {
            throw new Error("Only one of the variation can be tur(primary , secondary,warning,danger, success).")
        }
    }

};

export default Button;