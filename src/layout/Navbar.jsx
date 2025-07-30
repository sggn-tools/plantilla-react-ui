// src/features/menu/components/Navbar.jsx (Ahora es Sidebar)
import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectMenus } from '../features/auth/authSelectors';

const Navbar = ({ isCollapsed, toggleSidebar }) => { // Recibe props para controlar el sidebar
  
    const menuItems = useSelector(selectMenus);

    // La lógica de clic se mantiene, ya que es una interacción de usuario
    const handleParentMenuItemClick = (e) => {
        if (isCollapsed) {
        e.preventDefault();
        toggleSidebar();
        }
    };

    const handleFinalMenuItemClick = () => {
        toggleSidebar();
    };

    const renderMenuItem = (item, index) => {
        const hasSubmenu = item.subMenu && item.subMenu.length > 0;
        const submenuId = `submenu-${item.id || index}`;
        //const iconHtml = item.icon ? <span dangerouslySetInnerHTML={{ __html: item.icon }} /> : null;
        const iconHtml = item.icon ? <i className={item.icon}></i> : null;

        return (
        <li key={index} className={hasSubmenu ? 'nav-item sidebar-dropdown' : 'nav-item'}>
            {hasSubmenu ? (
            <>
                <a
                className="nav-link collapsed"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target={`#${submenuId}`}
                aria-expanded="false"
                aria-controls={submenuId}
                onClick={handleParentMenuItemClick}
                >
                {iconHtml}
                <span>{item.menu_name}</span>
                <i className="bi bi-chevron-down ms-auto"></i>
                </a>
                <ul
                id={submenuId}
                className="nav-content collapse"
                data-bs-parent="#sidebar-nav"
                >
                {[...item.subMenu]
                    .sort((a, b) => a.order - b.order)
                    .map((subItem, subIndex) => (
                    <li key={subIndex}>
                        <NavLink
                        to={subItem.route}
                        className="menu-item"
                        onClick={handleFinalMenuItemClick}
                        >
                        {subItem.icon && <span dangerouslySetInnerHTML={{ __html: subItem.icon }} />}
                        <span>{subItem.menu_name}</span>
                        </NavLink>
                    </li>
                    ))}
                </ul>
            </>
            ) : (
            <NavLink
                to={item.route}
                className="nav-link"
                onClick={handleFinalMenuItemClick}
            >
                {iconHtml}
                <span>{item.menu_name}</span>
            </NavLink>
            )}
        </li>
        );
    };

    if (!menuItems || menuItems.length === 0) {
        return null;
    }

    return (
        <aside
        id="sidebar"
        className={`sidebar ${isCollapsed ? 'collapsed' : ''}`}
        >
        <div className="sidebar-header d-flex justify-content-between align-items-center">
            <h3>Menú</h3>
        </div>
        <ul className="sidebar-nav list-unstyled" id="sidebar-nav">
            {menuItems
                .map(renderMenuItem)}
        </ul>
        </aside>
    );
};

export default Navbar;