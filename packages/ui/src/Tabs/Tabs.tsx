import {
  type ReactNode,
  type KeyboardEvent,
  useState,
  useId,
  Children,
  isValidElement,
  cloneElement,
  type ReactElement,
} from 'react';
import './Tabs.css';

export interface TabProps {
  /** Label shown in the tab button. */
  label: string;
  children: ReactNode;
}

/** Individual tab panel — only used as a direct child of `<Tabs>`. */
export function Tab({ children }: TabProps) {
  return <>{children}</>;
}

export interface TabsProps {
  /** `<Tab>` elements. */
  children: ReactElement<TabProps>[];
  /** Index of the initially selected tab (uncontrolled). Defaults to 0. */
  defaultIndex?: number;
}

export function Tabs({ children, defaultIndex = 0 }: TabsProps) {
  const [active, setActive] = useState(defaultIndex);
  const baseId = useId();

  const tabs = Children.toArray(children).filter(
    (c): c is ReactElement<TabProps> => isValidElement(c),
  );

  const handleKeyDown = (e: KeyboardEvent, index: number) => {
    let next = index;
    if (e.key === 'ArrowRight') next = (index + 1) % tabs.length;
    else if (e.key === 'ArrowLeft') next = (index - 1 + tabs.length) % tabs.length;
    else if (e.key === 'Home') next = 0;
    else if (e.key === 'End') next = tabs.length - 1;
    else return;

    e.preventDefault();
    setActive(next);
    document.getElementById(`${baseId}-tab-${next}`)?.focus();
  };

  return (
    <div className="fk-tabs">
      <div className="fk-tabs__list" role="tablist">
        {tabs.map((tab, i) => (
          <button
            key={i}
            id={`${baseId}-tab-${i}`}
            role="tab"
            aria-selected={i === active}
            aria-controls={`${baseId}-panel-${i}`}
            tabIndex={i === active ? 0 : -1}
            className={`fk-tabs__tab ${i === active ? 'fk-tabs__tab--active' : ''}`}
            onClick={() => setActive(i)}
            onKeyDown={(e) => handleKeyDown(e, i)}
          >
            {tab.props.label}
          </button>
        ))}
      </div>
      {tabs.map((tab, i) => (
        <div
          key={i}
          id={`${baseId}-panel-${i}`}
          role="tabpanel"
          aria-labelledby={`${baseId}-tab-${i}`}
          hidden={i !== active}
          tabIndex={0}
          className="fk-tabs__panel"
        >
          {i === active && cloneElement(tab)}
        </div>
      ))}
    </div>
  );
}
