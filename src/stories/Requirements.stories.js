import React, { useState, useRef } from "react";
import { storiesOf } from "@storybook/react";
import { Hero, HeroItem, HeroContent } from "../components/HeroAnimation/Hero";
import { FpsView } from "react-fps";

const stories = storiesOf("App Test", module);

stories.add("Hero", () => {
  const [open, setOpen] = useState(false);
  const [counter, setCounter] = useState(0);

  const ref = useRef(null);
  return (
    <>
      {/* <FpsView /> */}
      <div
        style={{
          width: 291,
          height: 623,
          // backgroundImage: `url('${require("../assets/mobileFrame.svg")}'`,
          // backgroundSize: "cover",
          border: "10px solid #303030",
          borderRadius: 30,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          overflow: "auto",
        }}
      >
        <Hero
          transitionDuration={0.5}
          open={open}
          setOpen={() => setOpen(!open)}
          related
          style={{ marginTop: 100, width: 200 }}
          // wrapperRef={ref}
          targetHeight='same'
          // targetHeight="full"
          // targetHeight={100}
        >
          <HeroItem>
            <div
              style={{
                backgroundImage: `url('${require("../assets/content.png")}'`,
                width: "100%",
                height: 180,
                backgroundSize: "cover",
                backgroundPosition: "center",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "white",
                fontSize: 30,
              }}
            >
              hero
            </div>
            <HeroContent>
              <div
                style={{
                  backgroundColor: "#ccc",
                  width: "100%",
                  height: 200,
                }}
              >
                contentttt
                <br />
                <button onClick={() => setCounter(counter + 1)}>+</button>{" "}
                &nbsp; {counter}
              </div>
            </HeroContent>
          </HeroItem>
        </Hero>
      </div>

      <div
        style={{
          marginTop: 200,
          border: "10px solid black",
          width: 400,
          height: 400,
          position: "relative",
        }}
      >
        <div
          style={{
            backgroundColor: "aqua",
            position: "absolute",
            width: "100%",
            height: "100%",
            top: 0,
            left: 0,
          }}
        />
      </div>
    </>
  );
});
