import * as icons from '@lib';
import { useState, SVGProps, ChangeEvent } from 'react';
import styles from '../styles/SearchIcons.module.css';
import { Input } from '@/components';
import { Icon } from './Icon';
import { useTimedState } from '@/hooks';

// import {Link} from '@lib/editor'

const PACKAGE_NAME = '@lib';

interface IconComponent {
  (props: SVGProps<SVGSVGElement>): JSX.Element;
  path: string;
}

type IconsType = {
  [key: string]: IconComponent;
};

// this is not being used because we have only one theme for icons
const filters: { label: string; value: string | null }[] = [
  { label: 'All', value: null },
  { label: 'Filled', value: 'filled' },
  { label: 'Outlined', value: 'outlined' },
  { label: 'Two tone', value: 'twotone' },
];

export const SearchIcons = () => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedIcon, setSelectedIcon] = useState<string | null>(null);
  const [filter, setFilter] = useState<string | null>(null);
  const [isTooltip, setIsTooltip] = useTimedState(1);

  const filteredIcons = Object.keys(icons).filter(iconName => {
    const loweredCaseName = iconName.toLowerCase();

    const loweredCaseQuery = searchQuery.toLowerCase();

    const isMatchedWithQuery = loweredCaseName.includes(loweredCaseQuery);

    let isMatchedFilter = false;

    if (filter && filter !== 'filled') {
      isMatchedFilter = loweredCaseName.endsWith(filter);
    } else if (filter && filter === 'filled') {
      isMatchedFilter =
        !loweredCaseName.endsWith('outlined') &&
        !loweredCaseName.endsWith('twotone');
    } else {
      isMatchedFilter = true;
    }

    return isMatchedFilter && isMatchedWithQuery;
  });

  let selectedIconComponent: IconComponent | null = null;

  let defaultExportPath = '';

  if (selectedIcon) {
    selectedIconComponent = (icons as IconsType)[selectedIcon];
    defaultExportPath = `${PACKAGE_NAME}${selectedIconComponent.path}`;
  }

  return (
    <div
      className={styles.container}
      style={
        {
          // minWidth: selectedIcon ? 'auto' : '100%',
          // minWidth: 'auto',
          // overflo
        }
      }
    >
      <div
        className={`${styles.card}`}
        style={{
          minWidth: selectedIcon ? 'auto' : '100%',
          transition: 'all 0.3s ease-in-out',
        }}
      >
        <Input
          placeholder="Search icons"
          type="search"
          value={searchQuery}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setSearchQuery(e.target.value)
          }
        />

        <div className={styles.iconsContainer}>
          {/* sidebar with different themed icons like true toned, outlined, filled etc */}
          {/* <div className={styles.filters}>
            {filters.map(({ label, value }) => (
              <div
                key={label}
                className={styles.filterLabel}
                style={{
                  ...(filter === value && {
                    background: '#000',
                    color: '#fff',
                  }),
                }}
                onClick={() => setFilter(value)}
              >
                {label}
              </div>
            ))}
          </div> */}

          <div className={styles.flexContainer}>
            {filteredIcons.map(name => {
              const Component = (icons as IconsType)[name];
              return (
                <Component
                  key={name}
                  onClick={() => setSelectedIcon(name)}
                  style={{ cursor: 'pointer' }}
                />
              );
            })}
          </div>
        </div>
      </div>
      {true && (
        <div
          className={`${styles.iconPreviewCard}`}
          style={{
            ...(selectedIcon && {}),
            flex: 0,
            border: '1px solid red',
            minWidth: selectedIcon ? '450px' : 0,
            transform: selectedIcon ? 'translateX(0)' : 'translateX(10%)',
            transition: 'all 0.3s ease-in-out',
          }}
        >
          <div className={styles.selectedIconName}>{selectedIcon}</div>
          <div
            className={styles.importStatement}
            onClick={() => {
              navigator.clipboard.writeText(
                `import { ${selectedIcon} } from "${PACKAGE_NAME}"`
              );
              setIsTooltip(true);
            }}
          >
            <span style={{ color: '#66d9ef' }}>import </span>
            <>{`{ ${selectedIcon} }`}</>
            <span style={{ color: '#66d9ef' }}> from </span>
            <span style={{ color: '#a6e22e' }}>"{PACKAGE_NAME}"</span>
            {isTooltip && <div className={styles.tooltip}>Copied</div>}
          </div>
          <div style={{ margin: '0.5rem 1rem', fontSize: '12.8px' }}>
            Or import directly from the file
          </div>
          <div
            className={styles.importStatement}
            onClick={() => {
              navigator.clipboard.writeText(
                `import ${selectedIcon} from "${defaultExportPath}"`
              );
              setIsTooltip(true);
            }}
          >
            <span style={{ color: '#66d9ef' }}>import </span>
            <>{selectedIcon}</>
            <span style={{ color: '#66d9ef' }}> from </span>
            <span style={{ color: '#a6e22e' }}>"{defaultExportPath}"</span>
          </div>
          <div className={styles.previewIcon}>
            <Icon Component={selectedIconComponent} fontSize="12rem" />
          </div>
        </div>
      )}
    </div>
  );
};
