import React from 'react';
import Container from 'react-bootstrap/Container';
import Carousel from 'react-bootstrap/Carousel';
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

const stickerPath = "/images/stickers/";

const slide1 = [
    stickerPath + "betty-chiquita-sticker.png",
    stickerPath + "betty-americanBeauty-sticker.png",
    stickerPath + "betty-rain-sticker.png",
    stickerPath + "cake-sticker.png",
];

const slide2 = [
    stickerPath + "betty-chiquita-sticker.png",
    stickerPath + "betty-americanBeauty-sticker.png",
    stickerPath + "betty-rain-sticker.png",
    stickerPath + "cake-sticker.png",
];

const slide3 = [
    stickerPath + "betty-freelunch-sticker.png",
    stickerPath + "pozole-sticker.png",
    stickerPath + "betty-palms-sticker.png",
    stickerPath + "betty-bearliving-sticker.png",
];

function Slide({ srcs }) {
    return (
        <Row>
            {srcs.map((src, index) => (
                <Col>
                <img
                    key={index}
                    src={src}
                    style={{ maxWidth: "100%", maxHeight: "100%", objectFit: "cover" }}
                />
                </Col>
            ))}
        </Row>
    );
}

export default function Designs() {
    return (
        <>
        <div style={{
            padding: '20px',
            //alignContent: 'center',
            //alignItems: 'center',
            //display: 'flex',
            //flexWrap:'wrap',
            //justifyContent: 'center',
        }}>
            <Row>
                    <h1 style={{ display: 'block', fontSize: '30px', fontWeight: '600'}}>
                                Designs
                    </h1>
            </Row>
            <Row>
                    <p class="col" style={{ display: 'block', fontSize: '20px', fontWeight: '300'}}>Transform any of these designs onto a sweater, poster, or sticker, and add your own touch to elevate your style.</p>
            </Row>
        </div>
        <Container id="designs" fluid>
            <Carousel data-bs-theme="dark" pause="hover">
                <Carousel.Item>
                    {/* <img src={designs[0]}></img> */}
                    <Slide srcs={slide1} />
                </Carousel.Item>
                <Carousel.Item>
                    {/* <img src={designs[0]}></img> */}
                    <Slide srcs={slide2} />
                </Carousel.Item>
                <Carousel.Item >
                    {/* <img src={designs[0]}></img> */}
                    <Slide srcs={slide3} />
                </Carousel.Item>
            </Carousel>
        </Container>
        </>
    );
}
