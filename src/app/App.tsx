import { VotingIllustration } from '../components/VotingIllustration';
import { ChoiceSummary } from '../components/ChoiceSummary';
import { SceneControls } from '../components/SceneControls';
import { SpatialGuide } from '../components/SpatialGuide';
import { TopicScene } from '../components/TopicScene';
import { Statistics } from '../components/Statistics';
import { useEffect, useReducer, useRef, useState } from 'react';
import { AnimatePresence, motion, MotionConfig, useReducedMotion } from 'motion/react';
import { Globe } from '../globe/Globe';
import { initialState, reducer } from './state';
import { history, currentMembers, membersAt } from '../data/history';
import { countries, countryById } from '../data/countries';
import { teamVision } from '../content/teamVision';
import { topics } from '../content/topics';
import { dimensions, evaluateChoices } from '../domain/model';
import { HISTORY_INTERVAL } from '../globe/config';
import { Icon } from '../components/Icon';
import { SourcesDialog } from '../components/SourcesDialog';

export default function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const systemReduced = useReducedMotion();
  const [motionOff, setMotionOff] = useState(false);
  const [flowPaused, setFlowPaused] = useState(false);
  const [activeNote, setActiveNote] = useState('share');
  const reduced = !!systemReduced || motionOff;
  const [ready, setReady] = useState(false),
    [sourcesOpen, setSourcesOpen] = useState(false),
    [countryList, setCountryList] = useState(false);
  const [visible, setVisible] = useState(!document.hidden);
  const heading = useRef<HTMLHeadingElement>(null);
  const sceneKey = `${state.stage}:${state.activeTopicId}:${state.selectedCountry ?? ''}`;
  const previousScene = useRef(sceneKey);
  const moment = history[Math.max(0, state.historyIndex)],
    country = state.selectedCountry ? countryById[state.selectedCountry] : null;
  const team = state.stage === 'TEAM_VISION';
  const teamSelections = Object.fromEntries(
    topics.filter((t) => t.teamVision).map((t) => [t.id, t.teamVision!.choiceId]),
  );
  const result = evaluateChoices(topics, team ? teamSelections : state.selections),
    topic = topics.find((t) => t.id === state.activeTopicId) ?? topics[0];
  const voting = topic.illustration === 'council-vote';
  const selectedPolicy = topic.choices.find((c) => c.id === state.selections[topic.id]);
  const future = state.stage === 'BUILD_FUTURE' || state.stage === 'RESULTS';
  const canCompare = !!state.selections[topic.id];
  const baseline = future && state.compareBaseline;
  const displayedResult = baseline
    ? evaluateChoices(topics, { ...state.selections, [topic.id]: '' })
    : result;
  const network =
    (team || (future && topic.id === 'energy')) &&
    result.networkIds.includes('shared-grid') &&
    !baseline;
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
      reduced ? 0 : 500,
    );
    return () => clearTimeout(timer);
  }, [sceneKey, reduced]);
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
  const chapter = team ? 3 : intro || historical ? 0 : future ? 2 : 1;
  return (
    <MotionConfig reducedMotion={reduced ? 'always' : 'never'}>
      <main
        className={`experience stage-${state.stage.toLowerCase()} ${network ? 'has-network' : ''} ${baseline ? 'is-baseline' : ''} ${future && voting ? 'has-voting' : ''}`}
      >
        <a className="skip-link" href="#story">
          Skip to story and controls
        </a>
        <Globe
          state={state}
          reduced={reduced}
          network={network}
          flowPaused={flowPaused}
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
            aria-label="Europe unwritten, return to present"
          >
            <Icon name="globe" />
            <span>
              EUROPE<span className="brand-sub">UNWRITTEN</span>
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
            { label: 'A possible future', action: () => dispatch({ type: 'BUILD' }) },
            { label: 'Our vision', action: () => dispatch({ type: 'TEAM_VISION' }) },
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
        <section id="story" className="story" aria-label="Narrative and choices">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={country?.id ?? `${sceneKey}-${historical ? state.historyIndex : ''}`}
              initial={{ opacity: 0, y: reduced ? 0 : 14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: reduced ? 0 : -8 }}
              transition={{ duration: reduced ? 0 : 0.45 }}
            >
              {intro ? (
                <>
                  <p className="eyebrow">
                    <span className="tiny-star">✳</span> The EU, from 1957 to today
                  </p>
                  <h1 ref={heading} tabIndex={-1}>
                    Europe is
                    <br />
                    still being
                    <br />
                    <em>written.</em>
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
                  <button className="primary-button" onClick={() => dispatch({ type: 'BUILD' })}>
                    What could we change?
                    <Icon name="arrow" />
                  </button>
                </>
              ) : team ? (
                <>
                  <p className="eyebrow">
                    Our Europe / 2050 <span className="draft-tag">Team draft</span>
                  </p>
                  <h1 ref={heading} tabIndex={-1} className="future-title">
                    {teamVision.headline}
                  </h1>
                  <p className="policy-explanation">{teamVision.introduction}</p>
                  <button
                    className="text-button"
                    disabled={reduced}
                    onClick={() => setFlowPaused(!flowPaused)}
                  >
                    {reduced ? 'Static view' : flowPaused ? 'Resume flows' : 'Pause flows'}
                  </button>
                  <ChoiceSummary
                    topics={topics}
                    selections={state.selections}
                    onEdit={(id) => dispatch({ type: 'TOPIC', id })}
                  />
                  <div className="vision-pillars">
                    {teamVision.pillars.map((p) => (
                      <details key={p.title}>
                        <summary>{p.title}</summary>
                        <p>{p.text}</p>
                      </details>
                    ))}
                    <details>
                      <summary>Questions for the team</summary>
                      <ul>
                        {teamVision.questions.map((question) => (
                          <li key={question}>{question}</li>
                        ))}
                      </ul>
                    </details>
                  </div>
                  <p className="model-note">
                    {teamVision.qualification}{' '}
                    <a
                      href="https://www.consilium.europa.eu/en/press/press-releases/2021/06/28/council-adopts-european-climate-law/"
                      target="_blank"
                      rel="noreferrer"
                    >
                      Climate law ↗
                    </a>
                  </p>
                  <button className="outline-button" onClick={() => dispatch({ type: 'BUILD' })}>
                    ← Return to your choices
                  </button>
                </>
              ) : future ? (
                <>
                  <nav className="topic-nav" aria-label="Policy topics">
                    {topics.map((t, index) => (
                      <button
                        key={t.id}
                        aria-current={topic.id === t.id ? 'step' : undefined}
                        onClick={() => dispatch({ type: 'TOPIC', id: t.id })}
                      >
                        <span>0{index + 1}</span> {t.title}
                        {state.selections[t.id] ? ' ✓' : ''}
                      </button>
                    ))}
                  </nav>
                  <TopicScene
                    topic={topic}
                    selectedChoice={state.selections[topic.id]}
                    showResults={state.stage === 'RESULTS'}
                    consequences={evaluateChoices([topic], state.selections).consequences}
                    headingRef={heading}
                    onChoose={(choiceId) =>
                      dispatch({ type: 'CHOOSE', topicId: topic.id, choiceId })
                    }
                    onResults={() => dispatch({ type: 'RESULTS' })}
                    onRevise={() => dispatch({ type: 'BUILD' })}
                  />
                  {state.stage === 'RESULTS' && (
                    <button
                      className="text-button"
                      onClick={() =>
                        topic.id !== topics.at(-1)!.id
                          ? dispatch({ type: 'TOPIC', id: topics[topics.indexOf(topic) + 1].id })
                          : dispatch({ type: 'TEAM_VISION' })
                      }
                    >
                      {topic.id !== topics.at(-1)!.id
                        ? 'Next question →'
                        : 'Discover our draft vision →'}
                    </button>
                  )}
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
                    Then try two ideas for what could change.
                  </p>
                  <button className="primary-button" onClick={() => dispatch({ type: 'BUILD' })}>
                    Change one thing
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
        {baseline && (
          <div className="baseline-notice" role="status">
            Viewing the baseline <span>Your choice is kept</span>
          </div>
        )}
        {future && voting && (
          <VotingIllustration
            rule={baseline ? 'unanimity' : (selectedPolicy?.visual.votingRule ?? 'unanimity')}
          />
        )}
        <aside className="globe-caption" aria-label="Globe key">
          {team ? (
            <>
              <span className="eyebrow">A working vision</span>
              <p>
                Proposals from
                <br />
                our team’s writing.
              </p>
              <small>Team proposals · not a forecast</small>
            </>
          ) : future ? (
            <>
              <span className="eyebrow">
                {baseline
                  ? 'Without this change'
                  : network
                    ? 'A possible connection'
                    : 'Your policy experiment'}
              </span>
              <p>
                {baseline
                  ? 'This choice removed. Your other choices remain.'
                  : network
                    ? 'More ways to share electricity.'
                    : 'See how the voting rule changes the result.'}
              </p>
              <span className="caption-rule" />
              <small>
                {network
                  ? 'Conceptual links · not infrastructure routes'
                  : 'Authored scenario · not a forecast'}
              </small>
            </>
          ) : (
            <>
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
            </>
          )}
        </aside>
        {future && (
          <div className="effect-readout" aria-live="polite">
            <span className="eyebrow">
              {baseline
                ? 'Without this choice / other choices kept'
                : 'All your choices / illustrative effects'}
            </span>
            {dimensions.map((d) => (
              <div className="effect-row" key={d.id}>
                <span title={d.meaning}>{d.label}</span>
                <div
                  className={`effect-ticks ${d.id === 'investment' ? 'cost' : ''}`}
                  aria-label={`${displayedResult.effects[d.id]} illustrative points`}
                >
                  {Array.from(
                    { length: Math.max(3, displayedResult.effects[d.id]) },
                    (_, i) => i + 1,
                  ).map((tick) => (
                    <i key={tick} className={tick <= displayedResult.effects[d.id] ? 'lit' : ''} />
                  ))}
                </div>
                <small>
                  {displayedResult.effects[d.id] > 0 ? `+${displayedResult.effects[d.id]}` : '—'}
                </small>
              </div>
            ))}
          </div>
        )}
        {future && (
          <SceneControls
            canCompare={canCompare}
            flowsAvailable={network}
            baseline={baseline}
            paused={flowPaused}
            reduced={reduced}
            onCompare={(enabled) => dispatch({ type: 'COMPARE_BASELINE', enabled })}
            onPause={() => setFlowPaused(!flowPaused)}
            onReset={() => dispatch({ type: 'OVERVIEW' })}
          />
        )}
        {network && !team && (
          <SpatialGuide active={activeNote} onChange={setActiveNote} reduced={reduced} />
        )}
        {!intro && !historical && !future && !team && (
          <div className="map-tools">
            <button
              className="icon-button"
              onClick={() => dispatch({ type: 'OVERVIEW' })}
              aria-label="Return to Europe overview"
              title="Return to Europe"
            >
              <Icon name="reset" />
            </button>
            <span>Drag to explore · Scroll to approach</span>
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
        {countryList && !intro && !historical && !future && !team && (
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
          <span>
            A TRANSITION YEAR EXPLORATION <span className="footer-divider">/</span> MADE IN IRELAND
          </span>
          <div>
            <button
              onClick={() => setMotionOff(!motionOff)}
              aria-pressed={reduced}
              disabled={!!systemReduced}
            >
              {reduced ? 'Reduced motion' : 'Reduce motion'}
            </button>
            <button onClick={() => setSourcesOpen(true)}>Sources & method ↗</button>
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
