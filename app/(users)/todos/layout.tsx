import TodoList from "./TodoList";
import './todoLayout.scss'

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <main className='todo-container'>
            <div className='todo-container__sidebar'>
                {/*@ts-ignore*/}
                <TodoList/>
            </div>
            <div className='todo-container__content'>{children}</div>
        </main>;
}
