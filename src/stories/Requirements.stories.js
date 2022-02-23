import React, { useState } from "react";
import { storiesOf } from "@storybook/react";
import { Hero } from "../components/HeroAnimation/Hero";

const stories = storiesOf("App Test", module);

stories.add("Hero", () => {
  const [open, setOpen] = useState(false);
  const [counter, setCounter] = useState(0);

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
        >
          <Hero.Item>
            <div
              style={{ backgroundColor: "#aaa", height: "100%", width: "100%" }}
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
            <Hero.Content>
              <div
                style={{ backgroundColor: "#ccc", width: "100%", height: 1200 }}
              >
                contentttt
                <br />
                <button onClick={() => setCounter(counter + 1)}>+</button>{" "}
                &nbsp; {counter}
              </div>
            </Hero.Content>
          </Hero.Item>
        </Hero>
      </div>
      <div>
        <div style={{ width: "100%", height: "100%", padding: 50 }}>
          <div style={{ width: 400, height: 500, backgroundColor: "#666" }} />
          <div style={{ width: 400, height: 500 }}></div>
          <div style={{ width: 400, height: 500 }} />
          <div style={{ width: 400, height: 500 }} />
          <div style={{ width: 400, height: 500 }} />
        </div>
      </div>
    </>
  );
});
