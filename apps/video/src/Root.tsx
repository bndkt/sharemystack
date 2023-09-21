import React from "react";
import { Folder, Still } from "remotion";

import "./style.css";

import { AppIcon } from "./components/stills/AppIcon";
import { SplashScreen } from "./components/stills/SplashScreen";
import { TwitterBanner } from "./components/stills/TwitterBanner";
import { ProductHuntGallery1 } from "./components/stills/ProductHuntGallery1";
import { ProductHuntGallery2 } from "./components/stills/ProductHuntGallery2";
import { ProductHuntGallery3 } from "./components/stills/ProductHuntGallery3";
import { ProductHuntTeaserMobile } from "./components/stills/ProductHuntTeaserMobile";
import { ProductHuntTeaserDesktop } from "./components/stills/ProductHuntTeaserDesktop";
import { OgImage } from "./components/stills/OgImage";

export const RemotionRoot: React.FC = () => {
  const fps = 30;

  return (
    <>
      <Folder name="Stills">
        <Still id="AppIcon" component={AppIcon} width={1024} height={1024} />
        <Still
          id="SplashScreen"
          component={SplashScreen}
          width={1284}
          height={2778}
        />
        <Still id="Favicon" component={AppIcon} width={48} height={48} />
        <Still
          id="TwitterBanner"
          component={TwitterBanner}
          width={1500}
          height={500}
        />
        <Still
          id="ProductHuntGallery1"
          component={ProductHuntGallery1}
          width={1270}
          height={760}
        />
        <Still
          id="ProductHuntGallery2"
          component={ProductHuntGallery2}
          width={1270}
          height={760}
        />
        <Still
          id="ProductHuntGallery3"
          component={ProductHuntGallery3}
          width={1270}
          height={760}
        />
        <Still
          id="ProductHuntTeaserDesktop"
          component={ProductHuntTeaserDesktop}
          width={1000}
          height={2000}
        />
        <Still
          id="ProductHuntTeaserMobile"
          component={ProductHuntTeaserMobile}
          width={1000}
          height={1000}
        />
        <Still id="OgImage" component={OgImage} width={1200} height={630} />
      </Folder>
    </>
  );
};
