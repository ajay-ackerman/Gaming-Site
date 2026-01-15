import React, { useState } from 'react';


const BIKES_DATA = {
    "motocross_sx": {
        "four_stroke": [
            "KTM 450 SX-F",
            "KTM 350 SX-F",
            "KTM 250 SX-F"
        ],
        "two_stroke": [
            "KTM 300 SX",
            "KTM 250 SX",
            "KTM 125 SX"
        ],
        "youth": [
            "KTM 85 SX",
            "KTM 65 SX",
            "KTM 50 SX",
            "KTM SX-E (Electric)"
        ]
    },
    "enduro_exc": {
        "four_stroke": [
            "KTM 500 EXC-F / 6DAYS",
            "KTM 450 EXC-F / 6DAYS",
            "KTM 350 EXC-F / 6DAYS",
            "KTM 250 EXC-F / 6DAYS"
        ],
        "two_stroke": [
            "KTM 300 EXC / 6DAYS",
            "KTM 250 EXC / 6DAYS",
            "KTM 150 EXC"
        ]
    },
    "cross_country_xc": {
        "four_stroke": [
            "KTM 450 XC-F",
            "KTM 350 XC-F",
            "KTM 250 XC-F"
        ],
        "two_stroke": [
            "KTM 300 XC",
            "KTM 250 XC",
            "KTM 125 XC"
        ]
    },
    "dual_sport_adventure": {
        "dual_sport": [
            "KTM 690 Enduro R",
            "KTM 390 Enduro R"
        ],
        "adventure": [
            "KTM 1390 Super Adventure R",
            "KTM 890 Adventure R",
            "KTM 390 Adventure R",
            "KTM 250 Adventure"
        ]
    }
};

const formatLabel = (str) => {
    return str.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
};

/**
 * Recursive Node Component
 */
const TreeNode = ({ label, data, level = 0, onSelect, selectedValue }) => {
    const [isOpen, setIsOpen] = useState(false);

    const isObject = data !== null && typeof data === 'object' && !Array.isArray(data);
    const isArray = Array.isArray(data);
    const hasChildren = isObject || isArray;
    const isSelected = selectedValue === label;

    const handleNodeClick = () => {
        if (hasChildren) {
            setIsOpen(!isOpen);
        } else {
            onSelect(label);
        }
    };

    return (
        <div className="select-none min-w-max">
            <div
                onClick={handleNodeClick}
                className={`flex items-center py-2.5 px-3 my-1 rounded-lg cursor-pointer transition-all duration-200 
          ${isSelected
                        ? 'bg-gray-100 text-gray-700 shadow-md transform scale-[1.02]'
                        : 'bg-transparent text-white hover:bg-gray-800/50'}`}
                style={{ marginLeft: `${level * 20}px` }}
            >
                {/* Animated Toggle Icon (Only for branch nodes) */}
                <div className="w-6 h-6 mr-2 flex items-center justify-center">
                    {hasChildren && (
                        <div className={`transition-transform duration-300 ${isOpen ? 'rotate-90' : 'rotate-0'}`}>
                            <svg
                                className="w-4 h-4"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                {isOpen ? (
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M20 12H4" />
                                ) : (
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M12 4v16m8-8H4" />
                                )}
                            </svg>
                        </div>
                    )}
                    {!hasChildren && (
                        <div className={`w-1.5 h-1.5 rounded-full ${isSelected ? 'bg-orange-600' : 'bg-orange-400'}`} />
                    )}
                </div>

                <span className={`text-sm whitespace-nowrap ${hasChildren ? 'font-bold uppercase tracking-tight' : 'font-medium'}`}>
                    {formatLabel(label)}
                </span>
            </div>

            {/* Recursive Render of Children */}
            {hasChildren && isOpen && (
                <div className="ml-2 border-l-2 border-orange-500">
                    {isObject && Object.entries(data).map(([key, value]) => (
                        <TreeNode
                            key={key}
                            label={key}
                            data={value}
                            level={level + 1}
                            onSelect={onSelect}
                            selectedValue={selectedValue}
                        />
                    ))}
                    {isArray && data.map((item) => (
                        <TreeNode
                            key={item}
                            label={item}
                            data={null}
                            level={level + 1}
                            onSelect={onSelect}
                            selectedValue={selectedValue}
                        />
                    ))}
                </div>
            )}
        </div>
    );
};

const Products = () => {
    const [selected, setSelected] = useState(null);

    return (
        <div className=' w-full min-h-fit max-h-screen p-7 overflow-auto bg-black items-center grid grid-cols-2 justify-between gap-5 text-white font-sans'>
            <div className='rounded-xs flex justify-center h-fit w-full '>
                <div className="w-full max-w-lg rounded-[2rem] shadow-2xl overflow-hidden border border-gray-900 bg-[#111]">

                    {/* Header Section (Restored for KTM Visuals) */}
                    <div className="bg-orange-600 p-8 relative overflow-hidden">
                        <div className="relative z-10">
                            <h2 className="text-white text-4xl font-black italic tracking-tighter leading-none">
                                READY TO <br />RACE
                            </h2>
                            <p className="text-orange-100 text-xs font-bold mt-2 tracking-widest uppercase">
                                KTM Model Catalog
                            </p>
                        </div>
                    </div>

                    {/* Tree List Section */}
                    <div className="p-6 max-h-[500px] overflow-y-auto custom-scrollbar">
                        {Object.entries(BIKES_DATA).map(([key, value]) => (
                            <TreeNode
                                key={key}
                                label={key}
                                data={value}
                                onSelect={setSelected}
                                selectedValue={selected}
                            />
                        ))}
                    </div>

                    {/* Selection Status Bar */}
                    <div className={`p-6 border-t border-gray-800 transition-all duration-500 ${selected ? 'bg-orange-50' : 'bg-[#0a0a0a]'}`}>
                        {selected ? (
                            <div className="flex items-center justify-between">
                                <div>
                                    <span className="text-[10px] font-bold text-orange-500 uppercase tracking-widest">Active Model</span>
                                    <p className="text-black font-black text-xl leading-tight">{selected}</p>
                                </div>
                                <button
                                    onClick={() => setSelected(null)}
                                    className="h-10 w-10 flex items-center justify-center rounded-full bg-white shadow-sm hover:shadow-md text-gray-400 hover:text-red-500 transition-all"
                                >
                                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            </div>
                        ) : (
                            <div className="text-center py-2 text-gray-400 text-sm italic font-medium">
                                Explore the hierarchy to select a model
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Right Column Details */}
            <div className='rounded-2xl h-full w-full bg-[#0a0a0a] border border-gray-900 p-6'>
                {selected && (
                    <div className="text-white animate-in fade-in slide-in-from-right-4 duration-500">
                        <h3 className="text-orange-500 font-black text-2xl italic tracking-tighter">TECHNICAL SPECS</h3>
                        <div className="mt-4 space-y-2 text-gray-400 text-sm">
                            <p>Model: {selected}</p>
                            <p>Status: Ready to Race</p>
                            <hr className="border-gray-800 my-4" />
                            <p className="italic">Detailed specifications for {selected} are being loaded...</p>
                        </div>
                    </div>
                )}
            </div>

            <style>{`
                .custom-scrollbar::-webkit-scrollbar { width: 5px; }
                .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
                .custom-scrollbar::-webkit-scrollbar-thumb { background: #ed6c02; border-radius: 10px; }
            `}</style>
        </div>
    );
};

export default function App() {
    return <Products />;
}