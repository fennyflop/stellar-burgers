import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { NavLink, useRouteMatch } from 'react-router-dom';
import styles from './header-link.module.css';
import { BurgerIcon, ListIcon, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components';

interface IHeaderLink {
    to: string;
    icon: "EditIcon" | "burger" | "list" | "profile";
}

const HeaderLink: React.FC<IHeaderLink> = ({to, icon, children}) => {
    const match = useRouteMatch(to);
    const imageClass = useMemo(() => match?.isExact ? "primary" : "secondary", [match]);
    const IconComponent = (icon == 'burger') ? <BurgerIcon type={imageClass} /> : (icon == 'list' ? <ListIcon type={imageClass} /> : <ProfileIcon type={imageClass} />);
    return (
        <NavLink className={styles.link} to={to}>
            {IconComponent}
            <div className="m-1"></div>
            <p className={`text text_type_main-default text_color_inactive ${match?.isExact && styles.active}`}>
                {children}
            </p>
        </NavLink>
    );
};

export default HeaderLink;