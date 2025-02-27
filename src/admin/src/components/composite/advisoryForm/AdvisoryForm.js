import React, { useState } from "react";
import PropTypes from "prop-types";
import "./AdvisoryForm.css";
import { Button } from "shared-components/build/components/button/Button";
import {
  TextField,
  ButtonGroup,
  Radio,
  Checkbox,
  FormControl,
  FormHelperText,
} from "@material-ui/core";
import MomentUtils from "@date-io/moment";
import {
  KeyboardDateTimePicker,
  MuiPickersUtilsProvider,
} from "@material-ui/pickers";
import ImageUploader from "react-images-upload";
import Select from "react-select";
import WarningIcon from "@material-ui/icons/Warning";
import CloseIcon from "@material-ui/icons/Close";
import AddIcon from "@material-ui/icons/Add";
import VisibilityToggle from "../../base/visibilityToggle/VisibilityToggle";
import {
  validateOptionalNumber,
  validateRequiredText,
  validateRequiredSelect,
  validateRequiredMultiSelect,
  validateRequiredDate,
  validateOptionalDate,
  validAdvisoryData,
} from "../../../validators/AdvisoryValidator";

import AuthorizedFunction from "../../../utils/AuthorizedFunction";

export default function AdvisoryForm({
  mode,
  data: {
    ticketNumber,
    setTicketNumber,
    listingRank,
    setListingRank,
    headline,
    setHeadline,
    eventType,
    eventTypes,
    setEventType,
    accessStatus,
    accessStatuses,
    setAccessStatus,
    description,
    setDescription,
    locationOptions,
    locations,
    setLocations,
    urgencies,
    urgency,
    setUrgency,
    isSafetyRelated,
    setIsSafetyRelated,
    isReservationAffected,
    setIsReservationAffected,
    advisoryDate,
    handleAdvisoryDateChange,
    displayAdvisoryDate,
    setDisplayAdvisoryDate,
    startDate,
    setStartDate,
    displayStartDate,
    setDisplayStartDate,
    endDate,
    setEndDate,
    displayEndDate,
    setDisplayEndDate,
    updatedDate,
    setUpdatedDate,
    displayUpdatedDate,
    setDisplayUpdatedDate,
    expiryDate,
    setExpiryDate,
    handleDurationIntervalChange,
    handleDurationUnitChange,
    onDrop,
    linksRef,
    linkTypes,
    removeLink,
    updateLink,
    addLink,
    notes,
    setNotes,
    submittedBy,
    setSubmittedBy,
    advisoryStatuses,
    advisoryStatus,
    setAdvisoryStatus,
    isStatHoliday,
    isAfterHours,
    isAfterHourPublish,
    setIsAfterHourPublish,
    saveAdvisory,
    isSubmitting,
    isSavingDraft,
    updateAdvisory,
    setToDashboard,
  },
}) {
  const [locationError, setLocationError] = useState("");
  const [eventTypeError, setEventTypeError] = useState("");
  const [accessStatusError, setAccessStatusError] = useState("");
  const [urgencyError, setUrgencyError] = useState("");
  const [advisoryStatusError, setAdvisoryStatusError] = useState("");
  const [ticketNumberError, setTicketNumberError] = useState("");
  const [headlineError, setHeadlineError] = useState("");
  const [descriptionError, setDescriptionError] = useState("");
  const [advisoryDateError, setAdvisoryDateError] = useState("");
  const [startDateError, setStartDateError] = useState("");
  const [endDateError, setEndDateError] = useState("");
  const [expiryDateError, setExpiryDateError] = useState("");
  const [updatedDateError, setUpdatedDateError] = useState("");
  const [submittedByError, setSubmittedByError] = useState("");
  const [listingRankError, setListingRankError] = useState("");
  const [formError, setFormError] = useState("");

  const advisoryData = {
    listingRank: { value: listingRank, setError: setListingRankError },
    ticketNumber: { value: ticketNumber, setError: setTicketNumberError },
    headline: { value: headline, setError: setHeadlineError, text: "headline" },
    eventType: {
      value: eventType,
      setError: setEventTypeError,
      text: "event type",
    },
    accessStatus: {
      value: accessStatus,
      setError: setAccessStatusError,
      text: "access status",
    },
    description: {
      value: description,
      setError: setDescriptionError,
      text: "description",
    },
    locations: {
      value: locations,
      setError: setLocationError,
      text: "locations",
    },
    urgency: { value: urgency, setError: setUrgencyError, text: "urgency" },
    advisoryDate: { value: advisoryDate, setError: setAdvisoryDateError },
    startDate: { value: startDate, setError: setStartDateError },
    endDate: { value: endDate, setError: setEndDateError },
    expiryDate: { value: expiryDate, setError: setExpiryDateError },
    updatedDate: { value: updatedDate, setError: setUpdatedDateError },
    submittedBy: {
      value: submittedBy,
      setError: setSubmittedByError,
      text: "submitted by",
    },
    advisoryStatus: {
      value: advisoryStatus,
      setError: setAdvisoryStatusError,
      text: "advisory status",
    },
    formError: setFormError,
  };

  const headlineInput = {
    id: "headline",
    required: false,
    placeholder: "Advisory Headline",
  };
  const descriptionInput = {
    id: "description",
    required: true,
    placeholder: "Description of advisory",
  };
  const linkTitleInput = {
    id: "link",
    required: false,
    placeholder: "Link Title",
  };
  const linkUrlInput = {
    id: "url",
    required: false,
    placeholder: "URL",
  };
  const notesInput = {
    id: "notes",
    required: false,
    placeholder: "Notes",
  };

  const submitterInput = {
    id: "submitter",
    required: false,
    placeholder: "Advisory Submitted by",
  };

  const ticketNumberInput = {
    id: "ticketNumber",
    required: false,
    placeholder: "Discover Camping Ticket Number",
  };

  const listingRankInput = {
    id: "listing",
    required: false,
    placeholder: "Listing Rank",
  };

  const intervals = [
    { label: "Two", value: 2 },
    { label: "Three", value: 3 },
    { label: "Four", value: 4 },
    { label: "Five", value: 5 },
  ];

  // Moment Intervals ref: https://momentjscom.readthedocs.io/en/latest/moment/03-manipulating/01-add/
  const intervalUnits = [
    { label: "Hours", value: "h" },
    { label: "Days", value: "d" },
    { label: "Weeks", value: "w" },
    { label: "Months", value: "M" },
  ];

  return (
    <MuiPickersUtilsProvider utils={MomentUtils}>
      <form>
        <div className="container-fluid ad-form">
          <div className="row">
            <div className="col-lg-4 col-md-4 col-sm-12 ad-label">
              Listing Rank
            </div>
            <div className="col-lg-7 col-md-8 col-sm-12">
              <TextField
                value={listingRank}
                onChange={(event) => {
                  setListingRank(event.target.value);
                }}
                className="bcgov-input"
                variant="outlined"
                InputProps={{ ...listingRankInput }}
                error={listingRankError !== ""}
                helperText={listingRankError}
                onBlur={() => {
                  validateOptionalNumber(advisoryData.listingRank);
                }}
              />
            </div>
          </div>
          <div className="row">
            <div className="col-lg-4 col-md-4 col-sm-12 ad-label">
              DC Ticket Number
            </div>
            <div className="col-lg-7 col-md-8 col-sm-12">
              <TextField
                value={ticketNumber}
                onChange={(event) => {
                  setTicketNumber(event.target.value);
                }}
                className="bcgov-input"
                variant="outlined"
                InputProps={{ ...ticketNumberInput }}
                error={ticketNumberError !== ""}
                helperText={ticketNumberError}
                onBlur={() => {
                  validateOptionalNumber(advisoryData.ticketNumber);
                }}
              />
            </div>
          </div>
          <div className="row">
            <div className="col-lg-4 col-md-4 col-sm-12 ad-label bcgov-required">
              Headline
            </div>
            <div className="col-lg-7 col-md-8 col-sm-12">
              <TextField
                value={headline}
                onChange={(event) => {
                  setHeadline(event.target.value);
                }}
                className="bcgov-input"
                variant="outlined"
                InputProps={{ ...headlineInput }}
                error={headlineError !== ""}
                helperText={headlineError}
                onBlur={() => {
                  validateRequiredText(advisoryData.headline);
                }}
              />
            </div>
          </div>
          <div className="row">
            <div className="col-lg-4 col-md-4 col-sm-12 ad-label bcgov-required">
              Event type
            </div>
            <div className="col-lg-7 col-md-8 col-sm-12">
              <FormControl
                variant="outlined"
                className={`bcgov-select-form ${
                  eventTypeError !== "" ? "bcgov-select-error" : ""
                }`}
                error
              >
                <Select
                  options={eventTypes}
                  value={eventTypes.filter((e) => e.value === eventType)}
                  onChange={(e) => setEventType(e.value)}
                  placeholder="Select an event type"
                  className="bcgov-select"
                  onBlur={() => {
                    validateRequiredSelect(advisoryData.eventType);
                  }}
                />
                <FormHelperText>{eventTypeError}</FormHelperText>
              </FormControl>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-4 col-md-4 col-sm-12 ad-label bcgov-required">
              Access Status
            </div>
            <div className="col-lg-7 col-md-8 col-sm-12">
              <FormControl
                variant="outlined"
                className={`bcgov-select-form ${
                  accessStatusError !== "" ? "bcgov-select-error" : ""
                }`}
                error
              >
                <Select
                  options={accessStatuses}
                  value={accessStatuses.filter((e) => e.value === accessStatus)}
                  onChange={(e) => setAccessStatus(e.value)}
                  placeholder="Select an access status"
                  className="bcgov-select"
                  onBlur={() => {
                    validateRequiredSelect(advisoryData.accessStatus);
                  }}
                />
                <FormHelperText>{accessStatusError}</FormHelperText>
              </FormControl>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-4 col-md-4 col-sm-12 ad-label bcgov-required">
              Description
            </div>
            <div className="col-lg-7 col-md-8 col-sm-12">
              <TextField
                value={description}
                onChange={(event) => {
                  setDescription(event.target.value);
                }}
                multiline
                rows={2}
                rowsMax={10}
                className="bcgov-input"
                variant="outlined"
                InputProps={{ ...descriptionInput }}
                error={descriptionError !== ""}
                helperText={descriptionError}
                onBlur={() => {
                  validateRequiredText(advisoryData.description);
                }}
              />
            </div>
          </div>
          <div className="row">
            <div className="col-lg-4 col-md-4 col-sm-12 ad-label bcgov-required">
              Location
            </div>
            <div className="col-lg-7 col-md-8 col-sm-12">
              <FormControl
                variant="outlined"
                className={`bcgov-select-form ${
                  locationError !== "" ? "bcgov-select-error" : ""
                }`}
                error
              >
                <Select
                  options={locationOptions}
                  value={locations}
                  onChange={(e) => {
                    setLocations(e);
                  }}
                  placeholder="Select a Park"
                  isMulti="true"
                  className="bcgov-select"
                  onBlur={() => {
                    validateRequiredMultiSelect(advisoryData.locations);
                  }}
                />
                <FormHelperText>{locationError}</FormHelperText>
              </FormControl>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-4 col-md-4 col-sm-12 ad-label bcgov-required">
              Urgency level
            </div>
            <div className="col-lg-8 col-md-8 col-sm-12">
              <FormControl error>
                <ButtonGroup
                  className="ad-btn-group"
                  color="primary"
                  aria-label="outlined primary button group"
                >
                  {urgencies.map((u) => (
                    <Button
                      key={u.value}
                      label={u.label}
                      styling={
                        urgency === u.value
                          ? "bcgov-normal-blue btn"
                          : "bcgov-normal-white btn"
                      }
                      onClick={() => {
                        setUrgency(u.value);
                      }}
                    />
                  ))}
                </ButtonGroup>
                <FormHelperText>{urgencyError}</FormHelperText>
              </FormControl>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-4 col-md-4 col-sm-6 col-6 ad-label">
              Safety related
            </div>
            <div className="col-lg-8 col-md-8 col-sm-6 col-6">
              <Checkbox
                checked={isSafetyRelated}
                onChange={(e) => {
                  setIsSafetyRelated(e.target.checked);
                }}
                inputProps={{ "aria-label": "safety related" }}
              />
            </div>
          </div>
          <div className="row">
            <div className="col-lg-4 col-md-4 col-sm-6 col-6 ad-label">
              Reservation affected
            </div>
            <div className="col-lg-8 col-md-8 col-sm-6 col-6">
              <Checkbox
                checked={isReservationAffected}
                onChange={(e) => {
                  setIsReservationAffected(e.target.checked);
                }}
                inputProps={{
                  "aria-label": "Discover camping affected",
                }}
              />
            </div>
          </div>
          <div className="row">
            <div className="col-lg-4 col-md-4 col-sm-12 ad-label">
              Effective date
            </div>
            <div className="col-lg-8 col-md-8 col-sm-12">
              <div className="field-bg-blue">
                <div className="ad-field ad-flex-wrap ad-flex">
                  <div className="col-lg-8 col-md-12 col-sm-12">
                    <div className="row">
                      <div className="col-lg-12 col-md-12 col-sm-12 plr0">
                        <div className="ad-flex">
                          <div className="p10 col-lg-3 col-md-3 col-sm-12 ad-date-label bcgov-required">
                            Advisory date
                          </div>
                          <div className="col-lg-9 col-md-9 col-sm-12 ad-flex-date">
                            <KeyboardDateTimePicker
                              id="advisoryDate"
                              value={advisoryDate}
                              onChange={handleAdvisoryDateChange}
                              format="MMMM DD, yyyy hh:mm A"
                              className={`bcgov-datepicker-wrapper ${
                                advisoryDateError !== ""
                                  ? "bcgov-datepicker-wrapper-error"
                                  : ""
                              }`}
                              error={advisoryDateError !== ""}
                              helperText={advisoryDateError}
                              onBlur={() => {
                                validateRequiredDate(advisoryData.advisoryDate);
                              }}
                            />
                            <VisibilityToggle
                              toggle={{
                                toggleState: displayAdvisoryDate,
                                setToggleState: setDisplayAdvisoryDate,
                              }}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-lg-12 col-md-12 col-sm-12 plr0">
                        <div className="ad-flex">
                          <div className="p10 col-lg-3 col-md-3 col-sm-12 ad-date-label">
                            Start date
                          </div>
                          <div className="col-lg-9 col-md-9 col-sm-12 ad-flex-date">
                            <KeyboardDateTimePicker
                              id="startDate"
                              value={startDate}
                              onChange={setStartDate}
                              format="MMMM DD, yyyy hh:mm A"
                              className={`bcgov-datepicker-wrapper ${
                                startDateError !== ""
                                  ? "bcgov-datepicker-wrapper-error"
                                  : ""
                              }`}
                              error={startDateError !== ""}
                              helperText={startDateError}
                              onBlur={() => {
                                validateOptionalDate(advisoryData.startDate);
                              }}
                            />
                            <VisibilityToggle
                              toggle={{
                                toggleState: displayStartDate,
                                setToggleState: setDisplayStartDate,
                              }}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-lg-12 col-md-12 col-sm-12 plr0">
                        <div className="ad-flex">
                          <div className="p10 col-lg-3 col-md-3 col-sm-12 ad-date-label">
                            End date
                          </div>
                          <div className="col-lg-9 col-md-9 col-sm-12 ad-flex-date">
                            <KeyboardDateTimePicker
                              id="endDate"
                              value={endDate}
                              onChange={setEndDate}
                              format="MMMM DD, yyyy hh:mm A"
                              className={`bcgov-datepicker-wrapper ${
                                endDateError !== ""
                                  ? "bcgov-datepicker-wrapper-error"
                                  : ""
                              }`}
                              error={endDateError !== ""}
                              helperText={endDateError}
                              onBlur={() => {
                                validateOptionalDate(advisoryData.endDate);
                              }}
                            />
                            <VisibilityToggle
                              toggle={{
                                toggleState: displayEndDate,
                                setToggleState: setDisplayEndDate,
                              }}
                            />
                          </div>
                        </div>
                      </div>
                    </div>{" "}
                    {mode === "update" && (
                      <div className="row">
                        <div className="col-lg-12 col-md-12 col-sm-12 plr0">
                          <div className="ad-flex">
                            <div className="p10 col-lg-3 col-md-3 col-sm-12 ad-date-label">
                              Updated date
                            </div>
                            <div className="col-lg-9 col-md-9 col-sm-12 ad-flex-date">
                              <KeyboardDateTimePicker
                                id="updatedDate"
                                value={updatedDate}
                                onChange={setUpdatedDate}
                                format="MMMM DD, yyyy hh:mm A"
                                className={`bcgov-datepicker-wrapper ${
                                  updatedDateError !== ""
                                    ? "bcgov-datepicker-wrapper-error"
                                    : ""
                                }`}
                                error={updatedDateError !== ""}
                                helperText={updatedDateError}
                                onBlur={() => {
                                  validateOptionalDate(
                                    advisoryData.updatedDate
                                  );
                                }}
                              />
                              <VisibilityToggle
                                toggle={{
                                  toggleState: displayUpdatedDate,
                                  setToggleState: setDisplayUpdatedDate,
                                }}
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                    <div className="row">
                      <div className="col-lg-12 col-md-12 col-sm-12 plr0">
                        <div className="ad-flex">
                          <div className="p10 col-lg-3 col-md-3 col-sm-12 ad-date-label">
                            Expiry date
                          </div>
                          <div className="col-lg-9 col-md-9 col-sm-12 ad-flex-date">
                            <KeyboardDateTimePicker
                              id="expiryDate"
                              value={expiryDate}
                              onChange={setExpiryDate}
                              format="MMMM DD, yyyy hh:mm A"
                              className={`bcgov-datepicker-wrapper  mr40 ${
                                expiryDateError !== ""
                                  ? "bcgov-datepicker-wrapper-error"
                                  : ""
                              }`}
                              error={expiryDateError !== ""}
                              helperText={expiryDateError}
                              onBlur={() => {
                                validateOptionalDate(advisoryData.expiryDate);
                              }}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-4 col-md-12 col-sm-12 plr0 ad-auto-margin">
                    <div className="ad-flex">
                      <div className="p10 col-lg-4 col-md-3 col-sm-12 ad-duration-label">
                        Duration
                      </div>
                      <div className="p10 ml15 col-lg-8 col-md-6 col-sm-8 col-8 ptm3 ad-interval-box">
                        <Select
                          options={intervals}
                          onChange={handleDurationIntervalChange}
                          placeholder="Select"
                          className="pbm3 ad-interval-select bcgov-select"
                        />
                        <Select
                          options={intervalUnits}
                          onChange={handleDurationUnitChange}
                          placeholder="Select"
                          className="ad-interval-select bcgov-select"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-4 col-md-4 col-sm-12 ad-label">Photos</div>
            <div className="col-lg-8 col-md-8 col-sm-12 ">
              <ImageUploader
                withIcon={false}
                onChange={onDrop}
                imgExtension={[".jpg", ".gif", ".png", ".gif"]}
                maxFileSize={5242880}
                withPreview={true}
                buttonText="Add a photo"
                buttonClassName="bcgov-normal-blue btn"
                withLabel={false}
                className="ad-field bg-blue"
              />
            </div>
          </div>
          <div className="row ">
            <div className="col-lg-4 col-md-4 col-sm-12 ad-label">Links</div>
            <div className="col-lg-7 col-md-8 col-sm-12">
              {linksRef.current.map((l, idx) => (
                <div key={idx}>
                  <div className="ad-link-flex">
                    <Select
                      options={linkTypes}
                      onChange={(e) => {
                        updateLink(idx, "type", e.value);
                      }}
                      value={linkTypes.filter((o) => o.value === l.type)}
                      className="ad-link-select bcgov-select"
                      placeholder="Select a link type"
                    />
                    <div
                      className="ad-link-close ad-add-link pointer div-btn "
                      tabIndex="0"
                      onClick={() => {
                        removeLink(idx);
                      }}
                      onKeyPress={(e) => {
                        if (e.key === "Enter") {
                          removeLink(idx);
                        }
                      }}
                    >
                      <CloseIcon />
                    </div>
                  </div>
                  <div className="ad-link-group">
                    <TextField
                      value={l.title}
                      onChange={(event) => {
                        updateLink(idx, "title", event.target.value);
                      }}
                      className="bcgov-input"
                      variant="outlined"
                      InputProps={{ ...linkTitleInput }}
                    />
                    <TextField
                      value={l.url}
                      onChange={(event) => {
                        updateLink(idx, "url", event.target.value);
                      }}
                      className="bcgov-input"
                      variant="outlined"
                      InputProps={{ ...linkUrlInput }}
                    />
                  </div>
                </div>
              ))}
              <div
                tabIndex="0"
                className="ad-add-link pointer div-btn"
                onKeyPress={(e) => {
                  if (e.key === "Enter") {
                    addLink();
                  }
                }}
                onClick={() => {
                  addLink();
                }}
              >
                <AddIcon />
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-4 col-md-4 col-sm-12 ad-label">
              Internal notes
            </div>
            <div className="col-lg-7 col-md-8 col-sm-12">
              <TextField
                value={notes}
                onChange={(event) => {
                  setNotes(event.target.value);
                }}
                className="bcgov-input"
                variant="outlined"
                InputProps={{ ...notesInput }}
              />
            </div>
          </div>
          {AuthorizedFunction(["manage-account"]) && (
            <div className="row">
              <div className="col-lg-4 col-md-4 col-sm-12 ad-label bcgov-required">
                Submitted By
              </div>
              <div className="col-lg-7 col-md-8 col-sm-12">
                <TextField
                  value={submittedBy}
                  onChange={(event) => {
                    setSubmittedBy(event.target.value);
                  }}
                  className="bcgov-input"
                  variant="outlined"
                  InputProps={{ ...submitterInput }}
                  error={submittedByError !== ""}
                  helperText={submittedByError}
                  onBlur={() => {
                    validateRequiredText(advisoryData.submittedBy);
                  }}
                />
              </div>
            </div>
          )}

          {mode === "update" && (
            <div className="row">
              <div className="col-lg-4 col-md-4 col-sm-12 ad-label bcgov-required">
                Advisory status
              </div>
              <div className="col-lg-7 col-md-8 col-sm-12">
                <FormControl
                  variant="outlined"
                  className={`bcgov-select-form ${
                    advisoryStatusError !== "" ? "bcgov-select-error" : ""
                  }`}
                  error
                >
                  <Select
                    options={advisoryStatuses}
                    value={advisoryStatuses.filter(
                      (a) => a.value === advisoryStatus
                    )}
                    onChange={(e) => setAdvisoryStatus(e.value)}
                    placeholder="Select an advisory status"
                    className="bcgov-select"
                    onBlur={() => {
                      validateRequiredSelect(advisoryData.advisoryStatus);
                    }}
                  />
                  <FormHelperText>{advisoryStatusError}</FormHelperText>
                </FormControl>
              </div>
            </div>
          )}
          {(isStatHoliday || isAfterHours) && (
            <div className="ad-af-hour-box">
              <div className="row">
                <div className="col-lg-4 col-md-4 col-sm-1 col-1 ad-label">
                  <WarningIcon className="warningIcon" />
                </div>
                <div className="col-lg-8 col-md-8 col-sm-11 col-11">
                  <p>
                    <b>
                      This is an after-hours advisory. <br />
                      The web team business hours are Monday to Friday,
                      8:30AM–4:30PM
                    </b>
                  </p>
                </div>
              </div>
              <div className="row">
                <div className="col-lg-4 col-md-4 col-sm-1 col-1 ad-label">
                  <Radio
                    checked={isAfterHourPublish}
                    onChange={() => {
                      setIsAfterHourPublish(true);
                    }}
                    value="Publish"
                    name="after-hour-submission"
                    inputProps={{ "aria-label": "Publish immediately" }}
                  />
                </div>
                <div className="col-lg-8 col-md-8 col-sm-11 col-11">
                  <p>Advisory is urgent/safety-related. Publish immediately.</p>
                </div>
              </div>
              <div className="row">
                <div className="col-lg-4 col-md-4 col-sm-1 col-1 ad-label">
                  <Radio
                    checked={!isAfterHourPublish}
                    onChange={() => {
                      setIsAfterHourPublish(false);
                    }}
                    value="Review"
                    name="after-hour-submission"
                    inputProps={{
                      "aria-label": "Submit for web team review",
                    }}
                  />
                </div>
                <div className="col-lg-8 col-md-8 col-sm-11 col-11">
                  <p>Advisory is not urgent. Submit for web team review.</p>
                </div>
              </div>
            </div>
          )}
          <br />
          <div className="row">
            <div className="col-lg-4 col-md-4"></div>
            <div className="col-lg-7 col-md-8 col-sm-12 ad-form-error">
              <FormControl error>
                <FormHelperText>{formError}</FormHelperText>
              </FormControl>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-4 col-md-4"></div>
            <div className="col-lg-7 col-md-8 col-sm-12 button-row ad-btn-group">
              {mode === "create" && (
                <>
                  <Button
                    label="Submit"
                    styling="bcgov-normal-yellow btn"
                    onClick={() => {
                      if (validAdvisoryData(advisoryData)) {
                        saveAdvisory("submit");
                      }
                    }}
                    hasLoader={isSubmitting}
                  />

                  <Button
                    label="Save Draft"
                    styling="bcgov-normal-light btn"
                    onClick={() => {
                      if (validAdvisoryData(advisoryData)) {
                        saveAdvisory("draft");
                      }
                    }}
                    hasLoader={isSavingDraft}
                  />
                </>
              )}
              {mode === "update" && (
                <>
                  <Button
                    label="Update"
                    styling="bcgov-normal-yellow btn"
                    onClick={() => {
                      if (validAdvisoryData(advisoryData, "update")) {
                        updateAdvisory();
                      }
                    }}
                    hasLoader={isSubmitting}
                  />
                </>
              )}
              <Button
                label="Cancel"
                styling="bcgov-normal-light btn"
                onClick={() => {
                  sessionStorage.clear();
                  setToDashboard(true);
                }}
              />
            </div>
          </div>
        </div>
      </form>
    </MuiPickersUtilsProvider>
  );
}

AdvisoryForm.propTypes = {
  mode: PropTypes.string.isRequired,
  data: PropTypes.shape({
    ticketNumber: PropTypes.string,
    setTicketNumber: PropTypes.func.isRequired,
    listingRank: PropTypes.string,
    setListingRank: PropTypes.func.isRequired,
    headline: PropTypes.string,
    setHeadline: PropTypes.func.isRequired,
    eventType: PropTypes.number,
    eventTypes: PropTypes.array.isRequired,
    setEventType: PropTypes.func.isRequired,
    accessStatus: PropTypes.number,
    accessStatuses: PropTypes.array.isRequired,
    setAccessStatus: PropTypes.func.isRequired,
    description: PropTypes.string,
    setDescription: PropTypes.func.isRequired,
    locationOptions: PropTypes.array.isRequired,
    locations: PropTypes.array,
    setLocations: PropTypes.func.isRequired,
    urgencies: PropTypes.array.isRequired,
    urgency: PropTypes.number,
    setUrgency: PropTypes.func.isRequired,
    isSafetyRelated: PropTypes.bool,
    setIsSafetyRelated: PropTypes.func.isRequired,
    isReservationAffected: PropTypes.bool,
    setIsReservationAffected: PropTypes.func.isRequired,
    advisoryDate: PropTypes.object,
    handleAdvisoryDateChange: PropTypes.func.isRequired,
    displayAdvisoryDate: PropTypes.bool,
    setDisplayAdvisoryDate: PropTypes.func.isRequired,
    startDate: PropTypes.object,
    setStartDate: PropTypes.func.isRequired,
    displayStartDate: PropTypes.bool,
    setDisplayStartDate: PropTypes.func.isRequired,
    endDate: PropTypes.object,
    setEndDate: PropTypes.func.isRequired,
    displayEndDate: PropTypes.bool,
    setDisplayEndDate: PropTypes.func.isRequired,
    updatedDate: PropTypes.object,
    setUpdatedDate: PropTypes.func.isRequired,
    displayUpdatedDate: PropTypes.bool,
    setDisplayUpdatedDate: PropTypes.func.isRequired,
    expiryDate: PropTypes.object,
    setExpiryDate: PropTypes.func.isRequired,
    handleDurationIntervalChange: PropTypes.func.isRequired,
    handleDurationUnitChange: PropTypes.func.isRequired,
    onDrop: PropTypes.func.isRequired,
    linksRef: PropTypes.object.isRequired,
    linkTypes: PropTypes.array.isRequired,
    removeLink: PropTypes.func.isRequired,
    updateLink: PropTypes.func.isRequired,
    addLink: PropTypes.func.isRequired,
    notes: PropTypes.string,
    setNotes: PropTypes.func.isRequired,
    submittedBy: PropTypes.string,
    setSubmittedBy: PropTypes.func.isRequired,
    advisoryStatuses: PropTypes.array.isRequired,
    advisoryStatus: PropTypes.number,
    setAdvisoryStatus: PropTypes.func.isRequired,
    isStatHoliday: PropTypes.bool,
    isAfterHours: PropTypes.bool,
    isAfterHourPublish: PropTypes.bool,
    setIsAfterHourPublish: PropTypes.func.isRequired,
    saveAdvisory: PropTypes.func.isRequired,
    isSubmitting: PropTypes.bool,
    isSavingDraft: PropTypes.bool,
    updateAdvisory: PropTypes.func.isRequired,
    setToDashboard: PropTypes.func.isRequired,
  }).isRequired,
};
