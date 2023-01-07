import React, { Suspense } from "react";
import './Home.scss'
import TodoList from "./(users)/todos/TodoList";
const Home = () => {
    
    return (
        <div className='home'>
            <p className='home__title'>Home</p>
        </div>
        // <div>
        //     <Suspense fallback={<p>Loading todos...</p>}>
        //         <h1>Loading todos...</h1>
        //         <div>
        //             {/*@ts-ignore*/}
        //             <TodoList />
        //         </div>
        //     </Suspense>

        //     <Suspense fallback={<p>Loading shopping trolleys...</p>}>
        //         <h1>Loading shopping trolleys...</h1>
        //         <div>
        //             {/*@ts-ignore*/}
        //             <TodoList />
        //         </div>
        //     </Suspense>
        // </div>
    );
};

export default Home;
