import { useState } from "react";
import { AdaptiveStateType, Media } from "../redux/adaptive/types";
import ButtonHeader from "./header/ButtonHeader";
import PopupCallback from "./popup/PopupCallback";

type MenuMobileDownProps = AdaptiveStateType;

const MenuMobileDown = ({ media }: MenuMobileDownProps) => {
	const [opened, setOpened] = useState(false);
	return (
		<div className="menu-mobile-down">
			<div className="menu-mobile-down__container">
				<div className="menu-mobile-down__grid">
					<a
						href="tel:8 (4922) 42-12-83"
						className="menu-mobile-down__phone"
					>
						8 (4922) 42-12-83
					</a>
					{media <= Media.MOBILE && <ButtonHeader setOpened={setOpened}  />}
					<PopupCallback opened={opened} setOpened={setOpened}/>
				</div>
			</div>
		</div>
	);
};

export default MenuMobileDown;
