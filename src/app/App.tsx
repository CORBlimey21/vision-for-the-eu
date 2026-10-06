import { narratedTopics } from '../content/narration';
import recordings from '../data/narration.json';
import { useNarration } from './useNarration';
import { ClosingScene } from '../components/ClosingScene';
import { TopicScene } from '../components/TopicScene';
import { Statistics } from '../components/Statistics';
import { useEffect, useReducer, useRef, useState } from 'react';
import { AnimatePresence, motion, MotionConfig, useReducedMotion } from 'motion/react';
import { Globe } from '../globe/Globe';
import { initialState, reducer } from './state';
import { history, currentMembers, membersAt } from '../data/history';
import { countries, countryById } from '../data/countries';
import { school, teamMembers } from '../content/project';
import { HISTORY_INTERVAL } from '../globe/config';
import { Icon } from '../components/Icon';
import { SourcesDialog } from '../components/SourcesDialog';

export default function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const systemReduced = useReducedMotion();
  const [motionOff, setMotionOff] = useState(false);
  const [activeNote, setActiveNote] = useState('share');
  const reduced = !!systemReduced || motionOff;
  const [ready, setReady] = useState(false),
    [sourcesOpen, setSourcesOpen] = useState(false),
    [countryList, setCountryList] = useState(false);
  const [visible, setVisible] = useState(!document.hidden);
  const heading = useRef<HTMLHeadingElement>(null);
  const [pointIndex, setPointIndex] = useState(0);
  const [autoAdvance, setAutoAdvance] = useState(true);
  const team = state.stage === 'TEAM_VISION';
  const closing = state.stage === 'ENDING';
  const future = team || state.stage === 'BUILD_FUTURE' || state.stage === 'RESULTS';
  const topic =
    narratedTopics.find((item) => item.id === (team ? 'vision-2050' : state.activeTopicId)) ??
    narratedTopics[0];
  const currentIndex = Math.min(pointIndex, topic.points.length - 1);
  const point = topic.points[currentIndex];
  const recording = recordings.find((item) => item.id === point.recordingId)!;
  const player = useNarration(recording, future, () => {
    if (!autoAdvance || document.hidden || sourcesOpen) return false;
    if (currentIndex >= topic.points.length - 1) {
      if (team) dispatch({ type: 'END' });
      return false;
    }
    setPointIndex(currentIndex + 1);
    return true;
  });
  const openTopic = (id: string) => {
    player.pause();
    player.seek(0);
    setPointIndex(0);
    setCountryList(false);
    dispatch(id === 'vision-2050' ? { type: 'TEAM_VISION' } : { type: 'TOPIC', id });
  };
  const openPoint = (index: number) => {
    player.pause();
    player.seek(0);
    setPointIndex(index);
  };
  const finish = () => {
    player.pause();
    setCountryList(false);
    dispatch({ type: 'END' });
  };
  const sceneKey = `${state.stage}:${topic.id}:${future ? point.id : ''}:${state.selectedCountry ?? ''}`;
  const previousScene = useRef(sceneKey);
  const moment = history[Math.max(0, state.historyIndex)],
    country = state.selectedCountry ? countryById[state.selectedCountry] : null;
  const network = future && point.graphic === 'energy';
  useEffect(() => {
    if (sourcesOpen) player.pause();
  }, [sourcesOpen, player.pause]);
  const historical = state.stage === 'HISTORY',
    intro = state.stage === 'INTRO';
  const memberCount = intro
    ? 0
    : historical
      ? membersAt(state.historyIndex).length
      : currentMembers.length;
  useEffect(() => {
    const fn = () => setVisible(!document.hidden);
    document.addEventListener('visibilitychange', fn);
    return () => document.removeEventListener('visibilitychange', fn);
  }, []);
  useEffect(() => {
    if (!historical || !state.playing || !visible || reduced) return;
    const timer = setTimeout(() => dispatch({ type: 'TICK' }), HISTORY_INTERVAL);
    return () => clearTimeout(timer);
  }, [historical, state.playing, state.historyIndex, visible, reduced]);
  useEffect(() => {
    if (previousScene.current === sceneKey) return;
    previousScene.current = sceneKey;
    // Wait for the outgoing scene to unmount; reduced-motion scenes mount immediately.
    const timer = window.setTimeout(
      () => {
        heading.current?.closest('.story')?.scrollTo({ top: 0 });
        heading.current?.focus({ preventScroll: true });
      },
      future || reduced ? 0 : 500,
    );
    return () => clearTimeout(timer);
  }, [sceneKey, reduced, future]);
  useEffect(() => {
    const fn = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && !sourcesOpen) {
        setCountryList(false);
        if (state.selectedCountry) dispatch({ type: 'OVERVIEW' });
      }
    };
    window.addEventListener('keydown', fn);
    return () => window.removeEventListener('keydown', fn);
  }, [sourcesOpen, state.selectedCountry]);
  const chapter = team || closing ? 3 : intro || historical ? 0 : future ? 2 : 1;
  return (
    <MotionConfig reducedMotion={reduced ? 'always' : 'never'}>
      <main
        className={`experience stage-${state.stage.toLowerCase()} ${network ? 'has-network' : ''} ${future ? 'is-narrated' : ''}`}
      >
        <a className="skip-link" href="#story">
          Skip to story and controls
        </a>
        <Globe
          state={state}
          reduced={reduced}
          network={network}
          flowPaused={!player.playing}
          showNotes={false}
          activeNote={activeNote}
          onNote={setActiveNote}
          onSelect={(id) => {
            setCountryList(false);
            dispatch({ type: 'SELECT', id });
          }}
          onReady={() => setReady(true)}
        />
        <div className="edge-shade" aria-hidden="true" />
        <header className="masthead">
          <a
            href="#"
            className="brand"
            onClick={(e) => {
              e.preventDefault();
              dispatch({ type: 'PRESENT' });
            }}
            aria-label="Vision for the EU, return to present"
          >
            <Icon name="globe" />
            <span>
              VISION<span className="brand-sub">FOR THE EU</span>
            </span>
          </a>
          <div className="edition">
            1957–2050<span>AN INTERACTIVE EXPLORATION</span>
          </div>
          <button className="about-button" onClick={() => setSourcesOpen(true)}>
            About this project <span>↗</span>
          </button>
        </header>
        <nav className="chapter-nav" aria-label="Experience chapters">
          {[
            { label: 'The story so far', action: () => dispatch({ type: 'REPLAY' }) },
            { label: 'Europe today', action: () => dispatch({ type: 'PRESENT' }) },
            { label: 'Our decisions', action: () => openTopic('ambition') },
            { label: 'Our vision', action: () => openTopic('vision-2050') },
          ].map((item, index) => (
            <button
              key={item.label}
              className={chapter === index ? 'active' : ''}
              aria-current={chapter === index ? 'step' : undefined}
              onClick={item.action}
            >
              <span className="chapter-number">0{index + 1}</span>
              <span>{item.label}</span>
              <i />
            </button>
          ))}
        </nav>
        <section id="story" className="story" aria-label="Story and team decisions">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={
                future
                  ? 'narration'
                  : (country?.id ?? `${sceneKey}-${historical ? state.historyIndex : ''}`)
              }
              initial={{ opacity: 0, y: reduced ? 0 : 14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: reduced ? 0 : -8 }}
              transition={{ duration: reduced ? 0 : 0.45 }}
            >
              {closing ? (
                <ClosingScene
                  headingRef={heading}
                  reduced={reduced || !visible}
                  onReplay={() => openTopic('ambition')}
                  onExplore={() => dispatch({ type: 'PRESENT' })}
                />
              ) : intro ? (
                <>
                  <p className="eyebrow">
                    <span className="tiny-star">✳</span> The EU, from 1957 to today
                  </p>
                  <h1 ref={heading} tabIndex={-1}>
                    What does
                    <br />
                    the EU
                    <br />
                    <em>need?</em>
                  </h1>
                  <p className="story-copy">
                    Six countries signed the Treaties of Rome.
                    <br />
                    Today the EU has twenty-seven members.
                  </p>
                  <button
                    className="primary-button"
                    disabled={!ready}
                    onClick={() => dispatch({ type: 'START', reduced })}
                  >
                    {ready ? 'Begin the story' : 'Preparing Europe'}
                    <Icon name="arrow" />
                  </button>
                  <button
                    className="text-button skip-intro"
                    onClick={() => dispatch({ type: 'PRESENT' })}
                  >
                    Or explore Europe today <span>↗</span>
                  </button>
                </>
              ) : historical ? (
                <>
                  <p className="eyebrow">{moment.label}</p>
                  <div className="history-year" aria-hidden="true">
                    {moment.year}
                    <span>↗</span>
                  </div>
                  <h1 className="history-title" ref={heading} tabIndex={-1}>
                    <span className="sr-only">{moment.year}: </span>
                    {moment.headline}
                  </h1>
                  <p className="story-copy">{moment.description}</p>
                  <div className="history-change">
                    <span>
                      {moment.remove?.length
                        ? `−${moment.remove.length}`
                        : moment.add.length
                          ? `+${moment.add.length}`
                          : '27'}
                    </span>
                    <p>
                      {moment.remove?.length
                        ? 'a departure from the Union'
                        : moment.add.length
                          ? 'countries joining'
                          : 'current member countries'}
                    </p>
                  </div>
                  <div className="history-actions">
                    {!reduced && (
                      <button
                        className="outline-button"
                        onClick={() => dispatch({ type: 'TOGGLE_PLAY' })}
                      >
                        <Icon name={state.playing ? 'pause' : 'play'} />
                        {state.playing ? 'Pause' : 'Play'}
                      </button>
                    )}
                    <button
                      className="text-button"
                      onClick={() =>
                        state.historyIndex === history.length - 1
                          ? dispatch({ type: 'PRESENT' })
                          : dispatch({ type: 'HISTORY_AT', index: state.historyIndex + 1 })
                      }
                    >
                      {state.historyIndex === history.length - 1
                        ? 'Explore the present'
                        : 'Next chapter'}{' '}
                      <Icon name="arrow" />
                    </button>
                  </div>
                </>
              ) : country ? (
                <>
                  <button
                    className="text-button back-button"
                    onClick={() => dispatch({ type: 'OVERVIEW' })}
                  >
                    ← All of Europe
                  </button>
                  <p className="eyebrow">An EU member country</p>
                  <h1 ref={heading} tabIndex={-1} className="country-title">
                    {country.name}
                    <span className="title-period">.</span>
                  </h1>
                  <p className="story-copy">
                    {country.founding
                      ? 'A founding member of the European Economic Community.'
                      : `Joined the European Communities or EU in ${country.joined}.`}
                  </p>
                  <div className="country-facts">
                    <div>
                      <span>{country.founding ? 'FOUNDING MEMBER' : 'JOINED'}</span>
                      <strong>{country.joined}</strong>
                    </div>
                    <div>
                      <span>PART OF</span>
                      <strong>
                        27 <small>countries</small>
                      </strong>
                    </div>
                  </div>
                  <Statistics items={country.statistics} />
                  <p className="micro-copy">
                    {country.id === 'DE'
                      ? '1958 refers to West Germany. Current borders shown.'
                      : 'Membership of the EEC / European Communities / EU.'}
                  </p>
                  <button className="primary-button" onClick={() => openTopic('ambition')}>
                    Hear our decisions
                    <Icon name="arrow" />
                  </button>
                </>
              ) : future ? (
                <>
                  <nav className="topic-nav" aria-label="Narration chapters">
                    {narratedTopics.map((item, index) => (
                      <button
                        key={item.id}
                        aria-current={topic.id === item.id ? 'step' : undefined}
                        onClick={() => openTopic(item.id)}
                      >
                        <span>0{index + 1}</span> {item.title}
                      </button>
                    ))}
                  </nav>
                  <TopicScene
                    topic={topic}
                    pointIndex={currentIndex}
                    recording={recording}
                    player={player}
                    autoAdvance={autoAdvance}
                    onAutoAdvance={() => setAutoAdvance(!autoAdvance)}
                    headingRef={heading}
                    onPoint={openPoint}
                    lastTopic={topic === narratedTopics.at(-1)}
                    reduced={reduced}
                    visible={visible}
                    onNextTopic={() =>
                      topic === narratedTopics.at(-1)
                        ? finish()
                        : openTopic(narratedTopics[narratedTopics.indexOf(topic) + 1].id)
                    }
                  />
                </>
              ) : (
                <>
                  <p className="eyebrow">
                    <span className="accent-dot" /> Europe, 2026
                  </p>
                  <h1 ref={heading} tabIndex={-1} className="present-title">
                    Twenty-seven
                    <br />
                    countries.
                    <br />
                    <em>What next?</em>
                  </h1>
                  <p className="story-copy">
                    Explore the countries in the EU today.
                    <br />
                    Hear our team’s decisions for what could change.
                  </p>
                  <button className="primary-button" onClick={() => openTopic('ambition')}>
                    Hear our decisions
                    <Icon name="arrow" />
                  </button>
                  <button
                    className="text-button skip-intro"
                    onClick={() => setCountryList(!countryList)}
                    aria-expanded={countryList}
                    aria-controls="country-picker"
                  >
                    Find a country <span>↗</span>
                  </button>
                </>
              )}
            </motion.div>
          </AnimatePresence>
        </section>
        <audio
          ref={player.audioRef}
          preload="none"
          playsInline
          {...player.mediaEvents}
          aria-hidden="true"
        />
        {future && (
          <aside className="scene-progress" aria-label="Chapter progress">
            <span>{topic.title}</span>
            <strong>
              {String(currentIndex + 1).padStart(2, '0')} /{' '}
              {String(topic.points.length).padStart(2, '0')}
            </strong>
            <div aria-hidden="true">
              {topic.points.map((item, index) => (
                <i key={item.id} className={index <= currentIndex ? 'reached' : ''} />
              ))}
            </div>
          </aside>
        )}
        {!future && !closing && (
          <aside className="globe-caption" aria-label="Globe key">
            <span className="eyebrow">
              {intro
                ? 'The European project'
                : historical
                  ? `Europe / ${moment.year}`
                  : country
                    ? country.name
                    : 'The European Union'}
            </span>
            <div className="member-count">
              {String(memberCount).padStart(2, '0')}
              <span>{intro ? 'countries highlighted' : 'member states'}</span>
            </div>
            <span className="legend-dot" />
            <small>Illumination marks membership</small>
          </aside>
        )}
        {!intro && !historical && !future && !closing && !team && (
          <div className="map-tools">
            <button
              className="icon-button"
              onClick={() => dispatch({ type: 'OVERVIEW' })}
              aria-label="Return to Europe overview"
              title="Return to Europe"
            >
              <Icon name="reset" />
            </button>
            <span>Drag within Europe · Scroll to zoom</span>
            <button
              className="text-button"
              onClick={() => setCountryList(!countryList)}
              aria-expanded={countryList}
              aria-controls="country-picker"
            >
              Country index <span>↗</span>
            </button>
          </div>
        )}
        {countryList && !intro && !historical && !future && !closing && !team && (
          <div className="country-picker" id="country-picker">
            <div className="dialog-heading">
              <span className="eyebrow">27 member countries</span>
              <button
                className="icon-button"
                aria-label="Close country index"
                onClick={() => setCountryList(false)}
              >
                <Icon name="close" />
              </button>
            </div>
            <div className="country-grid">
              {countries.map((c) => (
                <button
                  key={c.id}
                  className={c.id === state.selectedCountry ? 'selected' : ''}
                  onClick={() => {
                    dispatch({ type: 'SELECT', id: c.id });
                    setCountryList(false);
                  }}
                >
                  {c.name}
                  <span>↗</span>
                </button>
              ))}
            </div>
          </div>
        )}
        {historical && (
          <div className="timeline" aria-label="EU integration timeline">
            {history.map((entry, index) => (
              <button
                key={entry.year}
                className={`${index <= state.historyIndex ? 'reached' : ''} ${index === state.historyIndex ? 'current' : ''}`}
                aria-current={index === state.historyIndex ? 'step' : undefined}
                aria-label={`${entry.year}: ${entry.label}`}
                onClick={() => dispatch({ type: 'HISTORY_AT', index })}
              >
                <span className="timeline-track">
                  <i />
                </span>
                <span>{entry.year}</span>
              </button>
            ))}
          </div>
        )}
        {intro && (
          <div className="opening-footer">
            <span>1957</span>
            <span className="opening-line" />
            <span>2026</span>
            <span className="opening-thought">Explore what changed.</span>
          </div>
        )}
        <footer className="footer">
          <span className="footer-credits">
            {school} <span className="footer-divider">/</span> {teamMembers.join(' · ')}
          </span>
          <div>
            <button
              onClick={() => setMotionOff(!motionOff)}
              aria-pressed={reduced}
              disabled={!!systemReduced}
            >
              {reduced ? 'Reduced motion' : 'Reduce motion'}
            </button>
            <button onClick={() => setSourcesOpen(true)}>Sources & AI disclosure ↗</button>
          </div>
        </footer>
        <div className="map-credit">
          © EuroGeographics · Terrain © Mapzen{' '}
          <span>Contemporary borders; historical views schematic</span>
        </div>
        {sourcesOpen && <SourcesDialog onClose={() => setSourcesOpen(false)} />}
      </main>
    </MotionConfig>
  );
}
