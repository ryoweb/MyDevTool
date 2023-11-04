"use client";

import { useTheme } from "next-themes";
import './style.css';

export function ThemeSwitcher() {
    const { theme, setTheme } = useTheme()
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { checked } = e.target
        setTheme(checked ? 'dark' : 'light')
    }

    return (
        <div>
            <input
                type="checkbox"
                id="weatherCheckboxInput"
                checked={theme == 'light' ? false : true}
                onChange={handleChange}
            />
            <div className="weather-checkbox">
                <div className="weather-checkbox__wrap">
                    <div className="weather-checkbox__night">
                        <svg xmlns="http://www.w3.org/2000/svg" className="weather-checkbox__star" viewBox="0 0 200 200">
                            <path d="M 100 0 Q 100 90 200 100 Q 100 100 100 200 Q 90 100 0 100 Q 90 90 100 0" fill="#FFF" />
                            <path d="M 100 0 Q 100 90 200 100 Q 100 100 100 200 Q 90 100 0 100 Q 90 90 100 0" fill="#FFF" />
                            <path d="M 100 0 Q 100 90 200 100 Q 100 100 100 200 Q 90 100 0 100 Q 90 90 100 0" fill="#FFF" />
                            <path d="M 100 0 Q 100 90 200 100 Q 100 100 100 200 Q 90 100 0 100 Q 90 90 100 0" fill="#FFF" />
                            <path d="M 100 0 Q 100 90 200 100 Q 100 100 100 200 Q 90 100 0 100 Q 90 90 100 0" fill="#FFF" />
                            <path d="M 100 0 Q 100 90 200 100 Q 100 100 100 200 Q 90 100 0 100 Q 90 90 100 0" fill="#FFF" />
                            <path d="M 100 0 Q 100 90 200 100 Q 100 100 100 200 Q 90 100 0 100 Q 90 90 100 0" fill="#FFF" />
                            <path d="M 100 0 Q 100 90 200 100 Q 100 100 100 200 Q 90 100 0 100 Q 90 90 100 0" fill="#FFF" />
                            <path d="M 100 0 Q 100 90 200 100 Q 100 100 100 200 Q 90 100 0 100 Q 90 90 100 0" fill="#FFF" />
                            <path d="M 100 0 Q 100 90 200 100 Q 100 100 100 200 Q 90 100 0 100 Q 90 90 100 0" fill="#FFF" />
                            <path d="M 100 0 Q 100 90 200 100 Q 100 100 100 200 Q 90 100 0 100 Q 90 90 100 0" fill="#FFF" />
                        </svg>
                    </div>
                    <div className="weather-checkbox__cloud-back"></div>
                    <label className="weather-checkbox__button" htmlFor="weatherCheckboxInput">
                        <div className="weather-checkbox__moon">
                            <div className="weather-checkbox__moon-crater"></div>
                        </div>
                    </label>
                    <div className="weather-checkbox__sun-shadow"></div>
                    <div className="weather-checkbox__cloud-front"></div>
                    <div className="weather-checkbox__shadow"></div>
                </div>
            </div>
        </div >
    )
}