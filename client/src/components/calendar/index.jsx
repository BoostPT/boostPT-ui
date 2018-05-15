import React, { Component } from "react";
import Calendar from "react-big-calendar";
import moment from "moment";
import withDragAndDrop from "react-big-calendar/lib/addons/dragAndDrop";

Calendar.setLocalizer(Calendar.momentLocalizer(moment));
const DnDCalendar = withDragAndDrop(Calendar);