import { type FC, type PropsWithChildren } from 'react';

const Tooltip: FC<PropsWithChildren<{ text: string }>> = ({ children, text }) => {
    return (
        <div className="relative group">
            {children}
            <div className="w-28 whitespace-pre-line absolute left-1/2 transform -translate-x-1/2 bottom-full mb-2 hidden group-hover:block bg-gray-800 text-white text-xs rounded py-1 px-2">
                {text}
            </div>
        </div>
    );
};

export default Tooltip;
