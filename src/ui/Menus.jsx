import { createContext, useContext, useState, useRef, useEffect } from "react";
import styled from "styled-components";
import { HiEllipsisVertical } from "react-icons/hi2";

const MenuContext = createContext();

const StyledMenu = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;

const StyledToggle = styled.button`
  background: none;
  border: none;
  padding: 0.4rem;
  border-radius: var(--border-radius-sm);
  transform: translateX(0.8rem);
  transition: all 0.2s;

  &:hover {
    background-color: var(--color-grey-100);
  }

  & svg {
    width: 2.4rem;
    height: 2.4rem;
    color: var(--color-grey-700);
  }
`;

const StyledList = styled.ul`
  position: absolute;
  z-index: 100;

  background-color: var(--color-grey-0);
  box-shadow: var(--shadow-md);
  border-radius: var(--border-radius-md);
  min-width: 12rem;
  padding: 0.4rem 0;

  right: 0;
  top: calc(100% + 0.4rem);
`;

const StyledButton = styled.button`
  width: 100%;
  text-align: left;
  background: none;
  border: none;
  padding: 1.2rem 2.4rem;
  font-size: 1.4rem;
  transition: all 0.2s;
  white-space: nowrap;

  display: flex;
  align-items: center;
  gap: 1.6rem;

  &:hover {
    background-color: var(--color-grey-50);
  }

  & svg {
    width: 1.6rem;
    height: 1.6rem;
    color: var(--color-grey-400);
    transition: all 0.3s;
  }
`;

function Menu({ children }) {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef();

  function close() {
    setIsOpen(false);
  }

  function toggle() {
    setIsOpen((s) => !s);
  }

  useEffect(function () {
    function handleClick(e) {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        close();
      }
    }
    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, []);

  return (
    <MenuContext.Provider value={{ isOpen, close, toggle }}>
      <StyledMenu ref={menuRef}>
        {children}
      </StyledMenu>
    </MenuContext.Provider>
  );
}

function Toggle({ id }) {
  const { toggle } = useContext(MenuContext);
  return (
    <StyledToggle onClick={toggle}>
      <HiEllipsisVertical />
    </StyledToggle>
  );
}

function List({ children, id }) {
  const { isOpen } = useContext(MenuContext);
  if (!isOpen) return null;
  return <StyledList onClick={() => {}}>{children}</StyledList>;
}

function Button({ children, icon, onClick, disabled }) {
  const { close } = useContext(MenuContext);

  function handleClick() {
    onClick?.();
    close();
  }

  return (
    <li>
      <StyledButton onClick={handleClick} disabled={disabled}>
        {icon}
        <span>{children}</span>
      </StyledButton>
    </li>
  );
}

Menu.Toggle = Toggle;
Menu.List = List;
Menu.Button = Button;
Menu.Menu = Menu;

export default Menu;
