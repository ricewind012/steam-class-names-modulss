/**
 * Special children that can not be easily identified.
 */
specialModules = {
	gamepaddialog: findAllModules(
		(e) => e.WithBottomSeparator && !e.GyroButtonPickerDialog,
	)[0],
	cloudfileuploadbutton: findAllModules((e) => e.Ctn)[1],
	image: findAllModules((e) => e.ErrorDiv)[0],
	loyaltyrewarditemembed: findAllModules((e) => e.Ctn)[0],
	saleeventbbcodeparser: findAllModules((e) => e.ErrorDiv)[0],
};

// TODO: these are seen in the css loader map, but there are no such modules
//appdetailsbroadcastsection: (e) => e,
//balloon: e => e.,
//controllerconfiguratorgyrocalibrationdialog: (e) => e,
//controllerconfiguratormapping: (e) => e,
//friendactivityfeed: (e) => e,
//mainmenuapprunning: (e) => e,
//quickaccesscontrols: (e) => e,
//shorttemplates: (e) => e,
//soundtrackoverlay: (e) => e,
//standardtemplates: (e) => e,
//vrgamepadui: (e) => e,

/**
 * These are not seen in webpackCache for some reason.
 * TODO: unify with the rest ?
 * TODO: is absence of top-level await a bug ?
 */
(async () => {
	window.parsedModules = [
		...(
			await Promise.all(
				[
					"awardicon",
					"broadcast",
					"chunk~1a96cdf59", // Also broadcast
					"gamenotes",
					"gamerecording",
				].map(async (e) =>
					(await fetch(`https://steamloopback.host/${e}.js`)).text(),
				),
			)
		)
			.join("")
			.matchAll(/e\.exports=(.*?\})\}/g),
	].map((e) => {
		const exists = (c) => keys.some((e) => e === c);
		const mod = JSON.parse(e[1].replace(/(\w+):/g, '"$1":'));
		const keys = Object.keys(mod);
		const name = (() => {
			switch (true) {
				case exists("IconList"):
					return "awardicon";
				case exists("PopOutVideoTitleBar"):
					return "broadcastembeddable";
				case exists("BroadcastPlayerLite"):
					return "broadcastplayer";
				case exists("StoreSaleImage_mini"):
					return "broadcastwidgets";
				case exists("NotesPagedSettings"):
					return "gamenotes";
				case exists("GameNotesPopup"):
					return "gamenotespopups";
				case exists("ClipSavedHint"):
					return "gamerecording";
				case exists("LinkHelp"):
					return "pmhover";
				case exists("CommandButton"):
					return "prosemirror";
			}
		})();

		return [name, mod];
	});
})();

classModules = [
	["aboutsteamdialog", (e) => e.AboutSteamDialog],
	["accountpanel", (e) => e.ChangePersonaNameContent],
	["accountsettings", (e) => e.Avatar && e.EntryLabel],
	["achievementiconbase", (e) => e.RareAchievementNoAnimation],
	["achievementsheader", (e) => e.LeaderboardsButton],
	["achievementslist", (e) => e.UserUnlockDateTime && !e.Page],
	["achievementspage", (e) => e.UserUnlockDateTime && e.Page],
	["actionbuttonlegenditem", (e) => e.ActionButtonLabel],
	["activateproductdialog", (e) => e.ActivateProductHeading],
	["addnonsteamgamedialog", (e) => e.AddNonSteamGameDialog],
	["addonpicker", (e) => e.AddonPickerMessage],
	["addtocartbutton", (e) => e.AddToCartAnchorCtn],
	["allcollections", (e) => e.CollectionLabelCount],
	["animatedcallout", (e) => e.AnimatedCallout],
	["appactionbutton", (e) => e.PlayButtonContainer],
	["appactivityday", (e) => e.AppActivityDay],
	["appactivitydlc", (e) => e.CarouselControlsPadding],
	["appcarouseltrailer", (e) => e.AppCarouselTrailerCtn],
	["appdetails", (e) => e.AppDetailsOverviewPanel],
	["appdetailsachievementssection", (e) => e.AchievementHoverContainer],
	["appdetailsactivitysection", (e) => e.ActivityFeedContainer],
	[
		"appdetailsadditionalcontentsection",
		(e) => e.AdditionalItem && e.Soundtracks,
	],
	["appdetailsbutton", (e) => e.AppDetailsButton],
	["appdetailscommunityfeed", (e) => e.CommunityContentContainer],
	["appdetailscontrollersupport", (e) => e.ControllerSectionBody],
	["appdetailsdlcsection", (e) => e.DLCSection],
	["appdetailsfeatureicon", (e) => e.ExtraMargin],
	["appdetailsfriendssection", (e) => e.FriendsOverflow],
	["appdetailsgameinfocontainer", (e) => e.GameInfoShadow],
	["appdetailsgameinfopanel", (e) => e.GameDescription],
	["appdetailsheader", (e) => e.AppDetailsHeader],
	["appdetailshover", (e) => e.AppDetailsHover],
	["appdetailsinvalidostype", (e) => e.InvalidOSTypeBody],
	["appdetailsmastersubincluded", (e) => e.IncludedBanner],
	["appdetailsnotessection", (e) => e.NoteLink],
	["appdetailsoverview", (e) => e.SeekTarget],
	["appdetailsplaysection", (e) => e.PermanentlyUnavailable],
	["appdetailsprimarylinkssection", (e) => e.NavButton],
	["appdetailsreviewsection", (e) => e.EditMyReview],
	["appdetailsscreenshotssection", (e) => e.ScreenshotsSection],
	["appdetailssection", (e) => e.AppDetailsSection],
	["appdetailssectionheader", (e) => e.SectionHeader],
	[
		"appdetailssectionnonsteam",
		(e) => e.OfflineButton && e.Body && Object.keys(e).length === 3,
	],
	["appdetailssectionoffline", (e) => e.OfflineSectionBody],
	["appdetailssoundtrack", (e) => e.BackgroundBlurArt],
	["appdetailsspotlight", (e) => e.RatingContainer && e.Info],
	["appdetailstimedtrialbanner", (e) => e.MasterSubLink],
	["appdetailstradingcardssection", (e) => e.CardsSection],
	["appdetailsworkshopsection", (e) => e.WorkshopSection],
	["appfilterpane", (e) => e.CompatDropDown],
	["appgrid", (e) => e.LibraryImageBackgroundGlow],
	["applaunchingdetails", (e) => e.ShowControlOverviewContainerAnimation],
	["apppartnereventspage", (e) => e.AppBannerBackground],
	["appportrait", (e) => e.NoCapsuleImage],
	["appportraithover", (e) => e.AppPortraitHover],
	["appproperties", (e) => e.AppProperties],
	["artworkmodal", (e) => e.Creator && e.ShareButton],
	["audio", (e) => e.VolumeSliderLabel],
	["audiosettings", (e) => e.AudioAppCtn],
	["awardmodal", (e) => e.GrantAwardModal],
	["backbutton", (e) => e.BackButton],
	["backgroundglass", (e) => e.BackgroundGlass],
	["backupappsdialog", (e) => e.BackupAppsBrowse],
	["basicappdetailssectionstyler", (e) => e.AppDetailsContent],
	["basicgamecarousel", (e) => e.BasicGameCarousel],
	[
		"basiclibrary",
		(e) => e.LibraryContextMenu && e.OverlayTransitionDurationMS,
	],
	["basiclibrarysettingszoo", (e) => e.GiantHeading],
	["basicpartnereventspage", (e) => e.BasicPartnerEventsPage],
	["bbcode", (e) => e.ChatMessageSteamStore],
	["bbcodeeditor", (e) => e.DragTarget],
	["bbcodes", (e) => e.QuoteAuthor],
	["bbcodesuggestions", (e) => e.BBCode],
	["bluetoothsettings", (e) => e.NotConnectedLabel && e.Header],
	["borrowgamedialog", (e) => e.BorrowGameDialog],
	["bottombar", (e) => e.BottomBarContainer],
	["boxcarousel", (e) => e.BoxCarousel],
	["broadcastchat", (e) => e.BroadcastChat],
	["broadcastchatannouncement", (e) => e.GiveawayWinnerBox],
	["broadcastfirsttime", (e) => e.BroadcastFirstTimeDialog],
	["broadcastsettings", (e) => e.ConfigureMic],
	["broadcaststatus", (e) => e.BroadcastStatusBody],
	["browserviewfindinpage", (e) => e.ControlButton],
	["captiveportaldialog", (e) => e.CaptivePortalBrowserView],
	["carousel", (e) => e.carouselNavButton],
	["cdkeysdialog", (e) => e.CDKeyOption],
	["changeuserdialog", (e) => e.Prompt && e.Warning],
	["chatentry", (e) => e.chatEntryControls],
	// this is old but v*lve does not ever remove things
	["chatroom", (e) => e.YuleLog],
	["chatroomeffects", (e) => e.Snowflake],
	["chatroomgroupsettings", (e) => e.ChannelsButtons],
	["chatroommenu", (e) => e.ChatRoomContextNoPermission],
	["chatroomnotificationsettings", (e) => e.scrollMaskVertical],
	["chattabs", (e) => e.ChatTabTransitionGroup],
	["checkforupdatesdialog", (e) => e.CheckForUpdatesDialog],
	["claimitemshared", (e) => e.DialogCtn],
	["clanimagechooser", (e) => e.ImagesOuterContainer],
	["clanimagepickandresize", (e) => e.Image && Object.keys(e).length === 1],
	["cloudconflict", (e) => e.ConflictChoiceText],
	["cloudfileuploadprogress", (e) => e.UploadPreviewContainer],
	["collapseicon", (e) => e.CollapseIconParent],
	["collectionbanner", (e) => e.CollectionShelfBanner],
	["collectionview", (e) => e.DynamicCollectionLabelAndButton],
	["colorsettings", (e) => e.FloatingControls],
	["comment_thread", (e) => e.ActivityCommentThread],
	["console", (e) => e.Console],
	["contentmanagement", (e) => e.ContentManagement],
	["contextmenu", (e) => e.ContextMenuFocusContainer],
	["controllerconfigurator", (e) => e.ControllerConfiguratorActionSetSelector],
	["controllerconfigurator_mouseposition", (e) => e.BackgroundScreenshot],
	[
		"controllerconfiguratoractionsetselector",
		(e) => e.ActionSetNameOverIndicators,
	],
	["controllerconfiguratorchoosebinding", (e) => e.CombinedKeyboardContainer],
	["controllerconfiguratorchooseconfiguration", (e) => e.ConfigurationButton],
	["controllerconfiguratorgyrobuttonpicker", (e) => e.GyroButtonPickerDialog],
	["controllerconfiguratoriconpicker", (e) => e.BindingIconImage],
	["controllerconfiguratorsummary", (e) => e.StandardControl],
	["controllerconfiguratorvirtualmenus", (e) => e.VirtualMenus],
	[
		"controllerconfiguratorvisualizer_deadzones",
		(e) => e.VisualizerCenterXOffset,
	],
	["controllersettings", (e) => e.ControllerName],
	["creatorhomeembed", (e) => e.DevSummaryCtn],
	["cropmodal", (e) => e.CropImage],
	["cssgrid", (e) => e.CSSGrid],
	["customizationsettings", (e) => e.StartupMoviesSelectionDesc],
	["debugpointer", (e) => e.DebugPointer],
	["deckcompaticons", (e) => e.CompatIcon],
	["decksetuphelp", (e) => e.SetupHelp],
	["deckverified", (e) => e.CompatibilityDetailsContainerDesktop],
	["deferredsettinglabel", (e) => e.DeferredSettingLabel],
	["demobutton", (e) => e.DemoButton && e.DisabledButton],
	["deskjobpromo", (e) => e.DeskJobPromo],
	["desktopbrowser", (e) => e.BrowserTabs],
	["desktopsecuritysettings", (e) => e.SteamGuardIcon],
	["desktoptoasts", (e) => e.DesktopToastPopup],
	["dialogs", (e) => e.DialogTitle && e.DialogContent],
	["discoveryqueuewidget", (e) => e.DiscoveryQueueCarousel],
	["discoveryqueuewizard", (e) => e.DeckVerifiedLogo],
	["discussionwidget", (e) => e.DiscussContainer],
	["displayscaledialog", (e) => e.YouCanChangeThisLater],
	["displaysettings", (e) => e.TimeRangeControls && !e.BandwidthInput],
	["downloadgraph", (e) => e.DownloadGraph],
	["downloads", (e) => e.InProgress],
	["downloadsettings", (e) => e.BandwidthLimit],
	["draganddrop", (e) => e.GhostContainer],
	["dropdown", (e) => e.DialogDropDownMenu],
	["dropdownlabel", (e) => e.DropDownLabelTitle],
	["durationcontrol", (e) => e.DurationControlInit],
	["durationcontroldialog", (e) => e.DurationControlDialog],
	["eaaccessdialog", (e) => e.Description && e.DialogContainer],
	["emoticon", (e) => e.StickerHoverSticker],
	["emoticonsuggestion", (e) => e.Emoticon_Toggle],
	["errorconditiondesktop", (e) => e.RefreshLoginDialogModal],
	["errorconditionpanel", (e) => e.ErrorConditionContainer],
	["euladialog", (e) => e.EulaDialogContent],
	["eventbbcodeparser", (e) => e.LoyaltyRewardCtn],
	["eventbbcodesketchfab", (e) => e.sketchfabmodelembedded],
	[
		"eventdescriptionstorecapsule",
		(e) => e.AppSummaryWidgetCtn && Object.keys(e).length === 1,
	],
	["eventreminder", (e) => e.ReminderCheck],
	["expandableimage", (e) => e.PreviewCtn && e.SVG],
	["facetedbrowse", (e) => e.FacetedBrowseInnerCtn],
	["familysettings", (e) => e.AuthorizeUserField],
	["familysharedcomponents", (e) => e.FamilyMemberRowTop],
	["fastscrolloverlay", (e) => e.FastScrollOverlay],
	["focusring", (e) => e.FocusRing],
	["footer", (e) => e.BasicFooter],
	["footericons", (e) => e.Knockout],
	["friendinvites", (e) => e.IncomingInvites],
	["friendslist", (e) => e.FriendsChatsContainer],
	["friendsnooze", (e) => e.SnoozeZ],
	["friendssettings", (e) => e.FakeFriend],
	["gameactions", (e) => e.GotSteamDialog],
	["gamecapsule", (e) => e.GameCapsule],
	["gamehover", (e) => e.GameTitle],
	["gameinfodialog", (e) => e.GameInfoDialogContents],
	["gamelaunchingdialog", (e) => e.GameLaunchingDialog],
	["gamelist", (e) => e.NoSearchResultsContainer],
	["gamelistbar", (e) => e.GameListHomeAndSearch],
	["gamelistcollectionmenu", (e) => e.CollectionDeleteContainer],
	["gamelistdropdown", (e) => e.ScrollToTop],
	["gamelistentry", (e) => e.GameListEntryName],
	["gamelisthome", (e) => e.CollectionIconBox],
	["gamelistsearchbar", (e) => e.SearchFilterInputClear],
	["gamelistsectionheader", (e) => e.SectionHeaderContent],
	["gamepadcolorpicker", (e) => e.ColorPickerPreview],
	["gamepadcontextmenu", (e) => e.BasicContextMenuHeader],
	[
		"gamepaddropdown",
		(e) => e.DropDownControlButton && Object.keys(e).length === 2,
	],
	["gamepadhome", (e) => e.TabbedContent],
	["gamepadhomefriends", (e) => e.FavoriteFriend],
	["gamepadhomerecentgames", (e) => e.RecentGamesBackground],
	["gamepadhomerecommended", (e) => e.PlayNextCarousel],
	["gamepadhomewhatsnew", (e) => e.LibraryHomeWhatsNew],
	["gamepadinput", (e) => e.TogglePasswordVisibilityBtn],
	["gamepadlibrary", (e) => e.GamepadLibrary],
	["gamepadpage", (e) => e.GamepadPage && !e.LeftStick],
	["gamepadpagedsettings", (e) => e.PagedSettingsDialog_PageList_ShowTitle],
	["gamepadsearch", (e) => e.GamepadSearch],
	["gamepadslider", (e) => e.DefaultValueIsColorRange],
	["gamepadtabbedpage", (e) => e.CanBeHeaderBackground],
	["gamepadtoasts", (e) => e.GamepadToastPlaceholder],
	["gamepadui", (e) => e.GamepadUIPopupWindowBody],
	["gamepadui_svg_library", (e) => e.WifiBar1],
	["gamepaduiappoverlay", (e) => e.OverlayPosition],
	["gamepaduiappoverlayvirtualmenucontainer", (e) => e.VirtualMenuContainer],
	["guidedtour", (e) => e.PageIndicator],
	["gyroscopenoisebar", (e) => e.RotateChilden],
	["hardwaresurveydialog", (e) => e.HardwareSurveySections],
	["header", (e) => e.SuppressInteraction],
	["headerbrowser", (e) => e.HeaderBrowser],
	["homesettings", (e) => e.AppSelectorButton],
	["homestorecarousel", (e) => e.StoreCarouselCtn],
	["hoverposition", (e) => e.HoverPosition],
	["htmlpopupdialog", (e) => e.HTMLPopupDialog],
	["index", (e) => e.ThreeDots],
	["infoicon", (e) => e.MoreInfoIcon],
	["insetshadow", (e) => e.FriendsListInsetShadowCtn],
	["installdialog", (e) => e.DownloadItem],
	["installrequest", (e) => e.AppSizeRequired],
	["invitedrop", (e) => e.InviteDropMessage],
	["jumplist", (e) => e.JumpListItemText],
	["keyboardsettings", (e) => e.KeyboardThemeButtons],
	["keycapture", (e) => e.Capturing && !e.RecommendedNote],
	["languagescreen", (e) => e.LanguageScreen],
	["launchoptionsdialog", (e) => e.LaunchOptionDialog],
	["library", (e) => e.LibraryContextMenu && !e.OverlayTransitionDurationMS],
	["libraryassetimage", (e) => e.GreyBackground],
	["librarydesktopapps", (e) => e.DesktopApps],
	["libraryhome", (e) => e.LibraryHome],
	["libraryhomegamereleased", (e) => e.PrePurchaseContainer],
	["libraryhomemajorupdates", (e) => e.LibraryHomeMajorUpdates],
	["libraryhomenewupdates", (e) => e.WhatsNewGameListRow],
	["libraryhomeplaynext", (e) => e.PlayNextSubHead],
	["libraryhomerecentgames", (e) => e.RecentGames],
	["libraryhomeshowcases", (e) => e.DragInProgress],
	["librarysettings", (e) => e.LibrarySettings],
	["librarywhatsnew", (e) => e.ReadMore],
	["linkregionbox", (e) => e.LinkRegionDragBox],
	["loadingthrobber", (e) => e.SpinnerLoaderContainer],
	["localdateandtime", (e) => e.DateAndTimeInline],
	["lockscreen", (e) => e.PINClearedQuestion],
	["login", (e) => e.UserChooser],
	["loginpanel", (e) => e.LoginBackground],
	["logsettings", (e) => e.ManualOverlayContainer],
	["main", (e) => e.throbberContainer],
	["mainbrowser", (e) => e.MainBrowserContainer],
	["mainmenu", (e) => e.IsVirtualKeyboardShown],
	["mainpanelapprunning", (e) => e.MainPanelAppRunning],
	["managefriends", (e) => e.GenerateLinkButton],
	["mandatoryupdate", (e) => e.MandatoryUpdateTakeoverContent],
	["marketingmessages", (e) => e.Seen],
	["marketingmessagesdialog", (e) => e.MarketingMessagesDialog],
	["marquee", (e) => e.Marquee],
	["mediadialog", (e) => e.MM],
	["mediapage", (e) => e.MediaPage],
	["menu", (e) => e.MenuWrapper],
	["messages", (e) => e.MsgWithAddons],
	["miniprofile", (e) => e.playerContent],
	["modals", (e) => e.BodyNoScroll],
	["moveappsdialog", (e) => e.MoveAppsDialog],
	["mustupdateclientdialog", (e) => e.MustUpdateClientModalContent],
	["networkconnectiondialog", (e) => e.ConnectionStatus],
	["networkdiagnosticsdialog", (e) => e.ColumnDisplayName],
	["networkinfodialog", (e) => e.InfoDialogBody],
	["networkscreen", (e) => e.NetworkScreen],
	["networksettings", (e) => e.NetworkWarning && e.OfflineMode],
	["newlogindialog", (e) => e.MessagingContainer],
	["newloginpanel", (e) => e.CreateAccountButton],
	["nogamesdisplay", (e) => e.VisitStore],
	["nominationandvote", (e) => e.SteamAwardHeader],
	["nonetworkoverlay", (e) => e.NoNetwork],
	["notificationcontent", (e) => e.DownloadCompleteText],
	["notificationssettings", (e) => e.FriendsDescription],
	["oobecontrols", (e) => e.Icons && e.Label],
	["oobeerrorscreen", (e) => e.EqualWidthButtonPair],
	["overflowbox", (e) => e.OverflowBox],
	["overlappingtransition", (e) => e.ContentWrapper && e.TransitionGroup],
	["overlaybrowser", (e) => e.OverlayBrowserContainer],
	["overlaydialogs", (e) => e.Invited],
	["overlayguides", (e) => e.GuidesHomeHeaderDesc],
	["overlaytimer", (e) => e.Seconds],
	["pageablecontainer", (e) => e.HeaderPageControls],
	["pagedcontent", (e) => e.NavTitle],
	[
		"pagedsettings",
		(e) =>
			e.PagedSettingsDialog_Title && !e.PagedSettingsDialog_PageList_ShowTitle,
	],
	["parentalunlockdialog", (e) => e.RemotePlayStoreBlockedDialog],
	["partnereventdialog", (e) => e.ErrorIconLayout],
	["partnereventdisplay", (e) => e.EventDetailsPageContainer],
	["partnereventreferencedapps", (e) => e.ReferencedApps],
	["partnereventshared", (e) => e.PartnerEventFont],
	["partnersaledisplay", (e) => e.SalePageLogoSet],
	["perf", (e) => e.PerfProfileInfo && !e.HDRBadge],
	["personanameandstatus", (e) => e.statusAndName],
	["personastatusicons", (e) => e.PersonaStatusIcon],
	["pininput", (e) => e.DigitInputField],
	["playersdialog", (e) => e.PlayersDialog],
	["posttextentry", (e) => e.PostTextEntryArea],
	["powermenu", (e) => e.SuspendDialog],
	["presenterpopup", (e) => e.Speaker],
	["progressbar", (e) => e.ProgressBarFieldStatus],
	["qrcode", (e) => e.QRBits],
	["qrlogin", (e) => e.LoginQR],
	[
		"quickaccesscontrollerorder",
		(e) => e.OptedOut && Object.keys(e).length === 2,
	],
	["quickaccessmenu", (e) => e.BatteryProjectedValue && e.Up],
	[
		"quickaccessvoicecontrolssteamdeck",
		(e) => e.FriendVoiceChatSliderContainer,
	],
	["radio", (e) => e.Button && e.Group],
	["reactions", (e) => e.ReactorName],
	["recentchatssteamdeck", (e) => e.RecentChatsList],
	["recentlycompleted", (e) => e.RecentlyCompleted],
	["reloadingdialog", (e) => e.Popup && Object.keys(e).length === 1],
	["remainderlist", (e) => e.ItemWrapper],
	["remoteplay", (e) => e.ContentForm],
	["remoteplaydialog", (e) => e.SegmentedInput && Object.keys(e).length === 3],
	["remoteplaysettings", (e) => e.SubSetting],
	["removefreeappdialog", (e) => e.RemovingText],
	["removegamehover", (e) => e.RemoveBoxTransition],
	["reorderablelist", (e) => e.ReorderableListDialog],
	["reportaicontentdialog", (e) => e.ReportText],
	["reportitem", (e) => e.DMCA],
	["requestplaytime", (e) => e.ErrorText && Object.keys(e).length === 1],
	["resetcollectionsdialog", (e) => e.AfterResetSummary],
	["rootmenu", (e) => e.RootMenuButton],
	["salebanner", (e) => e.Big],
	["salepreviewwidgets", (e) => e.StoreSaleWidgetContainer],
	["savecollectiondialog", (e) => e.SaveCollectionContainer],
	["screenshotmanagerdialog", (e) => e.ScreenshotFormRow],
	["screenshotpopout", (e) => e.PopupScreenshotModal],
	["screenshots", (e) => e.ClickableScreenshot],
	["scrollfade", (e) => e.ScrollFade],
	["scrollpanel", (e) => e.ScrollPanel],
	["scrollsnapcarousel", (e) => e.ScrollSnapCarousel],
	["searchbar", (e) => e.SearchAndTitleContainer],
	["seasonalsale", (e) => e.SeasonalSale],
	["segmentedinputs", (e) => e.SegmentedCharacterInput && !e.Text],
	["serverbrowserdialog", (e) => e.ServerBrowserDialog],
	["settings", (e) => e.SettingsDialogSubHeader],
	["shared_common", (e) => e.v6 && e.AvatarImage],
	["sharedappdetailsheader", (e) => e.BoxSizerDelete],
	["sharedialog", (e) => e.ShareButton && e.ShareIcon],
	["sharescreenshotupload", (e) => e.ShareScreenshotDialog],
	["sharewithfriends", (e) => e.ShareDescription],
	["shutdowndialog", (e) => e.ShutdownDialog],
	["sketchfab", (e) => e.sketchfabmodelembedded],
	["smartscrollcontainer", (e) => e.ScrollToTopButtonPosition],
	["sortingdropdowncontrolbutton", (e) => e.SortingDropDownControlButton],
	["soundtrackcontrols", (e) => e.ControlsAndVolume],
	["spotlight", (e) => e.SpotlightDLC],
	["spotlightgameplaysummary", (e) => e.GamePlaySummaryContainer],
	["ssadialog", (e) => e.SSADialog],
	["steamavatar", (e) => e.avatarFrameImg],
	["steamchinareviewlauncher", (e) => e.AccountMenu && e.AppStatus],
	["steamdeckbootupthrobber", (e) => e.MoviePlaying],
	["steamdeckcompatfilter", (e) => e.SelectedFilterOption],
	["steamdesktop", (e) => e.FocusBar],
	["steamdesktopoverlay", (e) => e.BackToGameBtn],
	["steamos", (e) => e.DestructiveActionButtonIcon],
	["steamtemplates", (e) => e.AllNotificationsCommentPlus],
	["suggestdialog", (e) => e.mentionSearchText],
	["supernav", (e) => e.SuperNav],
	["supportalerts", (e) => e.BrowserWrapper && Object.keys(e).length === 1],
	["systemdock", (e) => e.UnplugWarning],
	["systemmanagement", (e) => e.HDRBadge],
	["systemreport", (e) => e.SystemReportDialog],
	["systemsettings", (e) => e.SteamRuntimeSystemInfoDialogContent],
	["throbber", (e) => e.ThrobberWrapper],
	["timezonescreen", (e) => e.TimezoneScreen],
	["titlebarcontrols", (e) => e.NotificationBellAnimation],
	["toggle", (e) => e.ToggleRow && e.Off],
	["tooltip", (e) => e.TextToolTip],
	["topleveltransitionswitch", (e) => e.TopLevelTransition],
	["uninstalldialog", (e) => e.UninstallDialog],
	["unreadchatmessagesheadersteamdeck", (e) => e.HasMessages],
	["unstyledbutton", (e) => e.UnstyledButton],
	["updatealert", (e) => e.BytesDownloaded],
	["updaterfield", (e) => e.UpdateBytesRemaining],
	["virtualkeyboard", (e) => e.Touched],
	["virtualkeyboardcontainer", (e) => e.VirtualKeyboardContainer],
	// May conflict with other broadcast modules in the future
	["vodplayer", (e) => e.BroadcastCtn],
	["voicechatheadersteamdeck", (e) => e.ActiveCall],
	["voicesettings", (e) => e.MicrophoneTest],
	// Generic, but returns 1 module
	["vrdashboard", (e) => e.FadeRight],
	// Generic, but returns 1 module
	["vrdashboardpopups", (e) => e.PopupRoot],
	// Generic, but returns 1 module
	["vrinstalldialog", (e) => e.CheckboxContainer],
	["writereview", (e) => e.WriteReviewContainer],
	["youtubeembed", (e) => e.DynamicLink_YoutubeViews],
];
