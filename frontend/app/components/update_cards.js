const fs = require('fs');
const file = 'c:/Users/Dell/Desktop/promanage/frontend/app/components/GoogleAdsFunnel.tsx';
let content = fs.readFileSync(file, 'utf8');

// Fix Left Cards (Top 2)
content = content.replace(
  /className=\`relative py-6 pl-16 pr-8 xl:pl-20 xl:pr-12 transition-all group ml-8 mb-4 lg:mb-0 z-10 \${positionClass}\`/g,
  'className={`relative py-6 transition-all group w-full ml-8 lg:ml-0 z-10 ${positionClass}`}'
);

content = content.replace(
  /<div\s+className=\"absolute -left-10 top-1\/2 -translate-y-1\/2 w-16 h-16 rounded-full flex items-center justify-center border-\[4px\] border-\[#fbfdfd\] shadow-\[0_10px_25px_rgba\(0,0,0,0\.15\)\] z-20 group-hover:scale-110 transition-transform duration-500\"/g,
  '<div\n                    className="absolute left-6 top-1/2 -translate-y-1/2 w-16 h-16 rounded-full flex items-center justify-center border-[4px] border-[#fbfdfd] shadow-[0_10px_25px_rgba(0,0,0,0.15)] z-20 group-hover:scale-110 transition-transform duration-500"'
);

content = content.replace(
  /<div className=\"flex flex-col\">\s*<span className=\"text-sm font-extrabold tracking-wider mb-1\"/g,
  '<div className="flex flex-col pl-28 pr-6">\n                    <span className="text-sm font-extrabold tracking-wider mb-1"'
);

// Fix Right Cards (Top 2)
content = content.replace(
  /className=\`relative py-6 pl-16 pr-8 xl:pl-20 xl:pr-12 transition-all group ml-12 lg:ml-0 mr-8 mb-4 lg:mb-0 z-10 \${positionClass}\`/g,
  'className={`relative py-6 transition-all group w-full ml-8 lg:ml-0 z-10 ${positionClass}`}'
);

const rightCardsStart = content.indexOf('{/* RIGHT cards (Top 2) */}');
const rightCardsEnd = content.indexOf('{/* Bottom Row: Cards 3 and 4 */}');
if (rightCardsStart !== -1 && rightCardsEnd !== -1) {
  let rightBlock = content.substring(rightCardsStart, rightCardsEnd);
  
  rightBlock = rightBlock.replace(/origin-left/g, 'origin-right');
  rightBlock = rightBlock.replace(/left-0/g, 'right-0');
  rightBlock = rightBlock.replace(/rotateY\(26deg\)/g, 'rotateY(-26deg)');
  
  content = content.substring(0, rightCardsStart) + rightBlock + content.substring(rightCardsEnd);
}

fs.writeFileSync(file, content);
console.log('Fixed successfully');
