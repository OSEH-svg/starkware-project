"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export function HowItWorks() {
  return (
    <section className="py-24 bg-black w-full overflow-hidden relative flex flex-col items-center">
      <div className="container px-4 relative z-10 flex flex-col items-center">
        <div className="text-center mb-16 max-w-4xl">
          <h2 className="text-4xl md:text-5xl font-serif text-white mb-6">Why Trade Here?</h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg font-light">
            We provide a simplified, powerful interface for the Extended Protocol. Same
            liquidity, better tools.
          </p>
        </div>

        <div className="relative h-[600px] hidden md:block w-full max-w-[1200px] mx-auto">
          {/* SVG Wave Background */}
          <div className="absolute inset-0 z-0 flex items-center justify-center">
             <svg width="1164" height="394" viewBox="0 0 1164 394" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
                <g opacity="0.9" filter="url(#filter0_f_20_189)">
                <path d="M44.6999 313.923L123.82 336.997L135.117 339.612C160.7 345.532 186.98 347.872 213.206 346.566L214.468 346.503C235.971 345.432 257.272 341.823 277.928 335.749L283.355 334.153C309.753 326.392 334.623 314.156 356.881 297.979C374.478 285.189 390.259 270.069 403.789 253.035L415.087 238.811C426.102 224.944 436.117 210.31 445.056 195.022L472.816 147.547L496.457 110.636C502.711 100.871 510.135 91.9068 518.565 83.9433L519.137 83.4022C528.67 74.3963 539.448 66.8073 551.141 60.8681L554.579 59.1214C567.516 52.5503 581.567 48.4557 596.008 47.0486C606.321 46.0437 616.723 46.4205 626.937 48.169L637.733 50.0172C646.268 51.4782 654.641 53.762 662.736 56.8367C675.857 61.8202 688.114 68.8313 699.061 77.6144L710.812 87.0427C721.204 95.3801 730.786 104.679 739.431 114.816C746.292 122.862 752.541 131.409 758.126 140.388L774.665 166.977L783.675 185.427C788.137 194.566 793.372 203.306 799.323 211.553L801.817 215.009C807.902 223.443 814.907 231.174 822.701 238.06L823.583 238.839C833.901 247.954 845.573 255.409 858.181 260.937L861.344 262.324C871.421 266.743 882.105 269.623 893.038 270.869C903.307 272.039 913.691 271.755 923.881 270.025L930.282 268.938C939.587 267.358 948.676 264.706 957.37 261.033L961.993 259.08C972.147 254.79 981.466 248.745 989.523 241.222C994.395 236.672 998.769 231.617 1002.57 226.141L1023.41 196.124L1055.38 146.939C1068.36 130.783 1082.83 115.891 1098.61 102.46L1117.7 86.2179" stroke="#7C7EFF" strokeWidth="5"/>
                </g>
                <path opacity="0.12" d="M44.6999 313.923L123.82 336.997L135.117 339.612C160.7 345.532 186.98 347.872 213.206 346.566L214.468 346.503C235.971 345.432 257.272 341.823 277.928 335.749L283.355 334.153C309.753 326.392 334.623 314.156 356.881 297.979C374.478 285.189 390.259 270.069 403.789 253.035L415.087 238.811C426.102 224.944 436.117 210.31 445.056 195.022L472.816 147.547L496.457 110.636C502.711 100.871 510.135 91.9068 518.565 83.9433L519.137 83.4022C528.67 74.3963 539.448 66.8073 551.141 60.8681L554.579 59.1214C567.516 52.5503 581.567 48.4557 596.008 47.0486C606.321 46.0437 616.723 46.4205 626.937 48.169L637.733 50.0172C646.268 51.4782 654.641 53.762 662.736 56.8367C675.857 61.8202 688.114 68.8313 699.061 77.6144L710.812 87.0427C721.204 95.3801 730.786 104.679 739.431 114.816C746.292 122.862 752.541 131.409 758.126 140.388L774.665 166.977L783.675 185.427C788.137 194.566 793.372 203.306 799.323 211.553L801.817 215.009C807.902 223.443 814.907 231.174 822.701 238.06L823.583 238.839C833.901 247.954 845.573 255.409 858.181 260.937L861.344 262.324C871.421 266.743 882.105 269.623 893.038 270.869C903.307 272.039 913.691 271.755 923.881 270.025L930.282 268.938C939.587 267.358 948.676 264.706 957.37 261.033L961.993 259.08C972.147 254.79 981.466 248.745 989.523 241.222C994.395 236.672 998.769 231.617 1002.57 226.141L1023.41 196.124L1055.38 146.939C1068.36 130.783 1082.83 115.891 1098.61 102.46L1117.7 86.2179" stroke="#7C7EFF" strokeWidth="5"/>
                <defs>
                <filter id="filter0_f_20_189" x="0" y="0" width="1163.32" height="393.417" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                <feFlood floodOpacity="0" result="BackgroundImageFix"/>
                <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
                <feGaussianBlur stdDeviation="22" result="effect1_foregroundBlur_20_189"/>
                </filter>
                </defs>
            </svg>
          </div>

          {/* Step 1: Connect Wallet (Bottom Left) */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className="absolute left-[7%] bottom-[55%] w-64"
          >
             <div className="relative mb-4">
                <span 
                    className="text-8xl font-bold absolute -top-14 -right-4 select-none"
                    //56,30
                    style={{
                        background: 'linear-gradient(180deg, #7C7EFF 0%, #313151 100%)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent'
                    }}
                >
                    1
                </span>
                <h3 className="text-xl font-bold text-white mb-2 relative z-10">Connect Wallet</h3>
             </div>
             <p className="text-gray-400 text-sm relative z-10">
               Link your Argent or Braavos wallet. No registration required.
             </p>
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            viewport={{ once: true }}
            className="absolute left-[0%] bottom-[8%] transform -translate-y-1/2"
          >
            <Image src="/icons/Group 5.png" alt="Connect Wallet" width={100} height={100} className="w-30 h-30 drop-shadow-[0_0_15px_rgba(124,126,255,0.3)]" />
          </motion.div>

           {/* Step 2: Trade (Center) */}
           <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            viewport={{ once: true }}
            className="absolute left-[60%] top-[29%] transform -translate-x-1/2 -translate-y-1/2 z-20"
           >
              <Image src="/icons/Group 6.png" alt="Trade" width={100} height={100} className="w-30 h-30 drop-shadow-[0_0_15px_rgba(124,126,255,0.3)]" />
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.8 }}
            viewport={{ once: true }}
            className="absolute left-[50%] top-[48%] transform -translate-x-1/2 w-64 text-center"
          >
             <span 
                className="text-8xl font-bold absolute -top-6 left-2/2 transform -translate-x-1/2 select-none"
                style={{
                    background: 'linear-gradient(180deg, #7C7EFF 0%, #313151 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent'
                }}
             >
                 2
             </span>
             <h3 className="text-xl font-bold text-white mb-2 relative z-10 pt-10 text-left">Trade</h3>

             <p className="text-gray-400 text-sm relative z-10 text-left">
               Access deep liquidity on BTC, ETH, and STRK perps with up to 20x leverage.
             </p>
          </motion.div>

          {/* Step 3: Earn (Right) */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 1.0 }}
            viewport={{ once: true }}
            className="absolute right-[10%] top-[17%] w-64 text-right"
          >
              <span 
                className="text-8xl font-bold absolute -top-14 left-54 select-none"
                style={{
                    background: 'linear-gradient(180deg, #7C7EFF 0%, #313151 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent'
                }}
              >
                  3
              </span>
             <h3 className="text-xl font-bold text-white mb-2 relative z-10 text-left">Earn</h3>
             <p className="text-gray-400 text-sm relative z-10 text-left">
               Positions are settled on Starknet. Fast, cheap, and secure.
             </p>
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 1.2 }}
            viewport={{ once: true }}
            className="absolute right-[0%] top-[32%] transform -translate-y-1/2"
          >
             <Image src="/icons/Group 7.png" alt="Earn" width={100} height={100} className="w-30 h-30 drop-shadow-[0_0_15px_rgba(124,126,255,0.3)]" />
          </motion.div>
        </div>

        {/* Mobile View (Vertical Stack) */}
        <div className="grid md:hidden gap-12 relative w-full h-[800px]">
          <div className="absolute left-12 top-0 bottom-0 w-0.5 bg-gradient-to-b from-indigo-500 via-purple-500 to-blue-500 opacity-20" />
            <div className="flex flex-col justify-between h-full py-20">
                 <MobileStep 
                    number="1"
                    title="Connect Wallet"
                    text="Link your Argent or Braavos wallet. No registration required."
                    imgSrc="/icons/Group 5.png"
                />
                <MobileStep 
                    number="2"
                    title="Trade"
                    text="Access deep liquidity on BTC, ETH, and STRK perps with up to 20x leverage."
                    imgSrc="/icons/Group 6.png"
                />
                <MobileStep 
                    number="3"
                    title="Earn"
                    text="Positions are settled on Starknet. Fast, cheap, and secure."
                    imgSrc="/icons/Group 7.png"
                />
            </div>
        </div>
      </div>
    </section>
  );
}

function MobileStep({ number, title, text, imgSrc }: any) {
  return (
    <div className="pl-12 ml-4 relative">
       <div className="absolute left-0 -top-10 transform -translate-x-[calc(50%-2px)]">
         <div className="w-30 h-30 flex items-center justify-center">
             <Image src={imgSrc} alt={title} width={100} height={100} />
         </div>
       </div>
      <span 
        className="text-6xl font-bold absolute -top-8 right-0 select-none"
        style={{
            background: 'linear-gradient(180deg, #7C7EFF 0%, #313151 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
        }}
      >
          {number}
      </span>
      <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
      <p className="text-gray-400 text-sm">{text}</p>
    </div>
  );
}
