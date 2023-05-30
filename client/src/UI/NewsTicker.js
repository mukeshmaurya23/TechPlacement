import React, { useState, useEffect, useContext } from "react";
import jQuery from "jquery";
import "./NewsTicker.css";

import newtag from "../images/newtag.png";
import $ from "jquery";
import "jquery-ui-dist/jquery-ui";
import { AuthContext } from "../components/store/auth-login";
import axios from "axios";
import { toast } from "react-toastify";
import { GET_NEWS_TICKER, LOCALHOST } from "../constant";
const NewsTicker = () => {
  const [state] = useContext(AuthContext);
  const [news, setNews] = useState([]);
  useEffect(() => {
    axios.get(GET_NEWS_TICKER).then((response) => {
      setNews(response.data);
    });
  }, []);
  jQuery.fn.liScroll = function (settings) {
    settings = jQuery.extend(
      {
        travelocity: 0.03,
      },
      settings
    );
    return this.each(function () {
      var $strip = jQuery(this);
      $strip.addClass("newsticker");
      var stripHeight = 1;
      $strip.find("li").each(function (i) {
        stripHeight += jQuery(this, i).outerHeight(true); // thanks to Michael Haszprunar and Fabien Volpi
      });
      var $mask = $strip.wrap("<div class='mask'></div>");
      var $tickercontainer = $strip
        .parent()
        .wrap("<div class='tickercontainer'></div>");
      var containerHeight = $strip.parent().parent().height(); //a.k.a. 'mask' width
      $strip.height(stripHeight);
      var totalTravel = stripHeight;
      var defTiming = totalTravel / settings.travelocity; // thanks to Scott Waye
      function scrollnews(spazio, tempo) {
        $strip.animate({ top: "-=" + spazio }, tempo, "linear", function () {
          $strip.css("top", containerHeight);
          scrollnews(totalTravel, defTiming);
        });
      }
      scrollnews(totalTravel, defTiming);
      $strip.hover(
        function () {
          jQuery(this).stop();
        },
        function () {
          var offset = jQuery(this).offset();
          var residualSpace = offset.top + stripHeight;
          var residualTime = residualSpace / settings.travelocity;
          scrollnews(residualSpace, residualTime);
        }
      );
    });
  };

  $(function () {
    $("ul#ticker01").liScroll();
  });

  const deleteHandler = async (id) => {
    const url = LOCALHOST + "/api/deleteNewsTicker/" + id;
    await axios.delete(url);
    toast.warning("Announcement Deleted");
    const updatedData = news.filter((item) => item._id !== id); //this line update the data in the frontend without refreshing the page
    setNews(updatedData);
  };

  return (
    <div class="holder">
      <ul id="ticker01">
        {news.map((announcement, index) => {
          return (
            <li key={index}>
              <p>{announcement.title}</p>

              {state && state.user && state.user.role === "admin" && (
                //delete button
                <button
                  className="btn btn-danger"
                  onClick={() => deleteHandler(announcement._id)}
                >
                  <i class="fa fa-trash" aria-hidden="true"></i>
                </button>
              )}
              <div>
                <img src={newtag} alt="newtag" className="new-tag" />
                <a href={announcement.link}>{announcement.link}</a>
                <hr
                  style={{
                    border: "1px solid #fff",
                  }}
                />
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default NewsTicker;
