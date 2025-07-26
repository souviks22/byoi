import { motion } from 'framer-motion'

export default function Layout({ children }: React.PropsWithChildren) {
    return (<div className='w-full h-full bg-gray-100 dark:bg-[#0e0f11] text-black dark:text-white font-sans flex justify-center items-center'>
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="w-[380px] h-[600px] p-5 bg-white text-black dark:bg-[#1a1c1e] dark:text-neutral-100 font-sans focus:outline-none border border-neutral-200 dark:border-neutral-800"
            role="dialog"
            aria-modal="true"
            aria-labelledby="popup-title"
            aria-describedby="popup-desc"
            tabIndex={-1}
        >
            {children}
        </motion.div>
    </div>)
}
