import React, { useState } from "react";
import { storiesOf } from "@storybook/react";
import { Hero } from "../components/HeroAnimation/Hero";

const stories = storiesOf("App Test", module);

stories.add("Hero", () => {
  const [open, setOpen] = useState(false);

  return (
    <div
      style={{
        width: 700,
        height: 700,
        border: "1px solid black",
        overflow: "hidden",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Hero
        transitionDuration={0.5}
        open={open}
        setOpen={() => setOpen(!open)}
        related
      >
        <Hero.Item background='#aaa'>
          <div
            style={{
              // backgroundColor: "#555",
              width: 400,
              height: 200,
              // color: "white",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            hero
          </div>
        </Hero.Item>
        <Hero.Content>
          <div style={{ backgroundColor: "#aaa", width: 400, height: 200 }}>
            contentttt
          </div>
        </Hero.Content>
      </Hero>
      {/* <div>
        <div style={{ width: "100%", height: "100%", padding: 50 }}>
          <div style={{ width: 400, height: 500, backgroundColor: "#666" }} />
          <div style={{ width: 400, height: 500 }}>
            
          </div>
          <div style={{ width: 400, height: 500 }} />
          <div style={{ width: 400, height: 500 }} />
          <div style={{ width: 400, height: 500 }} />
        </div>
      </div> */}
    </div>
  );
});
