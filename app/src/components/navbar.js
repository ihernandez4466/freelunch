import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
//import Link from 'next/link';
import Image from 'react-bootstrap/Image';
import { Link as ScrollLink } from 'react-scroll';
import { useState } from "react";
import { MagicTabSelect } from "react-magic-motion";

export function CustomNavBar() {
    return (
      <Navbar sticky="top" style={{ backgroundColor:'rgb(255, 255, 255, 0.8)'}}>
      <Container 
        fluid 
        style={{ justifyContent: 'space-between', display: 'flex' }}>
        <Navbar.Brand>
            <Image 
              src="http://localhost:3000/images/logo-icon.png"
              style={{
              height:'50px'}}
              ></Image>
        </Navbar.Brand>
        <Nav >
          <UnderlineTabs />
        </Nav>
      </Container>
    </Navbar>
    );
}
const underlineTabs = [{
  text: 'Home',
  to: 'home',
}, {
  text: 'Designs & Apparel',
  to: 'designs',
}, {
  text: 'Contact Us',
  to: 'contact-us',
}
]
export default function UnderlineTabs() {
  const [selectedIndex, setSelectedIndex] = useState(1);
 
  const tabsComponents = underlineTabs.map((tab, i) => {
    return (
      <ScrollLink
        type="button"
        key={`tab-${tab.text}`}
        onClick={() => setSelectedIndex(i)}
        to={`${tab.to}`} spy={true} smooth={true} duration={300} offset={-50}
        style={{
          padding: "0.65rem 0.75rem",
          color: 'var(--textPrimary)',
          backgroundColor: "rgba(238, 238, 238)",
          border: 0,
          cursor: "pointer",
        }}
      >
        {tab.text}
 
        {selectedIndex === i && (
          <div style={{ position: "relative", transform: "translateY(3px)" }}>
            <MagicTabSelect
              id="underline"
              transition={{ type: "spring", bounce: 0.3 }}
            >
              <div
                style={{
                  width: "100%",
                  height: "0.15rem",
                  backgroundColor: "black",
                  position: "absolute",
                }}
              />
            </MagicTabSelect>
          </div>
        )}
      </ScrollLink>
    );
  });
 
  return <div style={{ display: "flex", gap: "0.5rem" }}>{tabsComponents}</div>;
}
