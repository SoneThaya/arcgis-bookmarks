import React, { useEffect, useRef } from "react";
import { loadModules } from "esri-loader";

const Map = () => {
  const MapEl = useRef(null);

  useEffect(() => {
    loadModules([
      "esri/WebMap",
      "esri/views/MapView",
      "esri/widgets/Bookmarks",
      "esri/widgets/Expand",
    ]).then(([WebMap, MapView, Bookmarks, Expand]) => {
      const webmap = new WebMap({
        portalItem: {
          // autocasts as new PortalItem()
          id: "000e8d0ba9744468a77335d91e25b688",
        },
      });

      const view = new MapView({
        container: "viewDiv",
        map: webmap,
      });

      const bookmarks = new Bookmarks({
        view: view,
        // allows bookmarks to be added, edited, or deleted
        editingEnabled: true,
      });

      const bkExpand = new Expand({
        view: view,
        content: bookmarks,
        expanded: true,
      });

      // Add the widget to the top-right corner of the view
      view.ui.add(bkExpand, "top-left");

      // bonus - how many bookmarks in the webmap?
      webmap.when(function () {
        if (webmap.bookmarks && webmap.bookmarks.length) {
          console.log("Bookmarks: ", webmap.bookmarks.length);
        } else {
          console.log("No bookmarks in this webmap.");
        }
      });
    });
  }, []);

  return (
    <>
      <div
        id="viewDiv"
        style={{ height: "100vh", width: "100vw" }}
        ref={MapEl}
      ></div>
    </>
  );
};

export default Map;
