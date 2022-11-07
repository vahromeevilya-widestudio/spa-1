import { useCallback, useRef, useState } from "react";
import { AdaptiveStateType, Media } from "../../redux/adaptive/types";
import Menu from "./Menu";
import ButtonHeader from "./ButtonHeader";
import PopupCallback from "../popup/PopupCallback";

type HeaderProps = AdaptiveStateType;

const Header = ({ media }: HeaderProps) => {
	const htmlRef = useRef(document.documentElement);
	const toggleBurger = useCallback(() => {
		htmlRef.current.classList.toggle("menu-open");
	}, []);
	const [active, setActive] = useState(false);

	return (
		<header className="header" data-scroll="400">
			<div className="header__wrapper" data-lp>
				<div className="header__container">
					<div className="header__grid">
						<button
							onClick={toggleBurger}
							type="button"
							className="icon-menu"
						>
							<span></span>
						</button>
						<a href="" className="header__logo">
							<img src="img/logo.svg" alt="Логотип" />
						</a>
						<div className="header__menu menu">
							{media >= Media.DESKTOP && <Menu />}
						</div>
						<div className="header__actions">
							<a
								href="tel:8 (4922) 42-12-83"
								className="header__phone _icon-phone"
							>
								<span>8 (4922) 42-12-83</span>
							</a>
							{media > Media.MOBILE && <ButtonHeader setActive={setActive} />}
							{/*<PopupCallback active={active} setActive={setActive}/>*/}
						</div>
					</div>
				</div>
			</div>
		</header>
	);
};

export default Header;
