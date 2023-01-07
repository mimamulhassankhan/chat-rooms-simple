import './searchLayout.scss'
import Search from './Search';

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <main className='search-container'>
            <div className='search-container__sidebar'>
                <p className='search-container__sidebar__item'>search</p>
            </div>
            <div className='search-container__content'>
                {/*@ts-ignore*/}
                <Search/>
                {children}
            </div>
        </main>;
}
