import React, { useState, useRef } from "react";
import { storiesOf } from "@storybook/react";
import { Hero, HeroItem, HeroContent } from "../components/HeroAnimation/Hero";

const stories = storiesOf("App Test", module);

stories.add("Hero", () => {
  const [open, setOpen] = useState(false);
  const [counter, setCounter] = useState(0);

  const ref = useRef(null);
  return (
    <>
      <div style={{ marginBottom: 200 }}>bbb</div>
      <div
        style={{
          width: 700,
          height: 700,
          border: "1px solid black",
          // overflow: "hidden",
        }}
      >
        <Hero
          transitionDuration={0.5}
          open={open}
          setOpen={() => setOpen(!open)}
          related
          style={{ marginTop: 200 }}
          wrapperRef={ref}
        >
          <HeroItem>
            <div
              style={{
                backgroundImage:
                  "url('https://img.rawpixel.com/s3fs-private/rawpixel_images/website_content/lr/s88-ted-2231-eve-01_1.jpg?w=600&dpr=1&fit=default&crop=default&q=65&vib=3&con=3&usm=15&bg=F4F4F3&auto=format&ixlib=js-2.2.1&s=5fb4d428538681c02df139d65d27f9b6')",
                height: "100%",
                width: "100%",
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            >
              <div>ccc</div>
              <div
                style={{
                  width: 400,
                  height: 200,
                  marginTop: 200,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                hero
              </div>
            </div>
            <HeroContent>
              <div
                style={{ backgroundColor: "#ccc", width: "100%", height: 1200 }}
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
      <div>
        <div style={{ width: "100%", height: "100%", padding: 50 }}>
          <div
            style={{ width: 400, height: 200, backgroundColor: "#666" }}
            ref={ref}
          />
          <div style={{ width: 400, height: 500 }}></div>
          <div style={{ width: 400, height: 500 }} />
          <div style={{ width: 400, height: 500 }} />
          <div style={{ width: 400, height: 500 }} />
        </div>
      </div>
    </>
  );
});
