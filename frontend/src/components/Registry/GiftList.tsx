import { useCallback, useEffect, useState, useRef } from 'react';
import { useOutletContext } from 'react-router-dom';
import giftService from '../../services/gift';
import { Context } from '../../types/context';
import { Gift } from '../../types/gift';
import './GiftList.css';

type GiftListProps = {
  claiming: boolean;
  setClaiming: React.Dispatch<React.SetStateAction<boolean>>;
};

type GiftSectionProps = {
  title: string;
  className: string;
  gifts: Gift[];
};

const STALE_TIME = 1 * 60 * 1000;

const GiftList = ({ claiming, setClaiming }: GiftListProps) => {
  const { household, language } = useOutletContext<Context>();

  const [gifts, setGifts] = useState<Gift[]>([]);
  const sortedGifts = gifts.toSorted((a, b) => {
    switch (language) {
      case 'English':
        return a.nameEnglish.localeCompare(b.nameEnglish);
      case 'Hungarian':
        return a.nameHungarian.localeCompare(b.nameHungarian);
      default:
        return 0;
    }
  });
  const giftAvailable = (gift: Gift) => gift.householdId === null;
  const giftClaimedByYou = (gift: Gift) => gift.householdId === household?.id;
  const giftClaimedByOther = (gift: Gift) =>
    gift.householdId !== null && gift.householdId !== household?.id;
  const availableGifts = sortedGifts.filter(giftAvailable);
  const claimedByYouGifts = sortedGifts.filter(giftClaimedByYou);
  const claimedByOtherGifts = sortedGifts.filter(giftClaimedByOther);
  const [giftIdBeingClaimed, setGiftIdBeingClaimed] = useState<number | null>(
    null
  );

  const lastFetchRef = useRef(Date.now());
  const idleTimeoutRef = useRef<number | null>(null);

  const fetchGifts = useCallback(async () => {
    try {
      const fetchedGifts = await giftService.fetchAllGifts();
      setGifts(fetchedGifts);

      lastFetchRef.current = Date.now();
      scheduleIdleTrigger();
    } catch (error) {
      console.error('Failed to fetch gifts:', error);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleWake = useCallback(() => {
    if (Date.now() - lastFetchRef.current > STALE_TIME) {
      fetchGifts();
    }
    window.removeEventListener('mousemove', handleWake);
    window.removeEventListener('keydown', handleWake);
  }, [fetchGifts]);

  const scheduleIdleTrigger = useCallback(() => {
    if (idleTimeoutRef.current) {
      clearTimeout(idleTimeoutRef.current);
    }

    idleTimeoutRef.current = window.setTimeout(() => {
      if (Date.now() - lastFetchRef.current > STALE_TIME) {
        window.addEventListener('mousemove', handleWake);
        window.addEventListener('keydown', handleWake);
      }
    }, STALE_TIME);
  }, [handleWake]);

  useEffect(() => {
    fetchGifts();

    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible') {
        fetchGifts();
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    window.addEventListener('focus', fetchGifts);
    window.addEventListener('online', fetchGifts);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('focus', fetchGifts);
      window.removeEventListener('online', fetchGifts);
      window.removeEventListener('mousemove', handleWake);
      window.removeEventListener('keydown', handleWake);
      if (idleTimeoutRef.current) {
        clearTimeout(idleTimeoutRef.current);
      }
    };
  }, [fetchGifts, handleWake]);

  const handleCheckboxChange = async (
    checkbox: HTMLInputElement,
    giftId: number,
    claim: boolean
  ) => {
    checkbox.disabled = true;
    setClaiming(true);
    setGiftIdBeingClaimed(giftId);

    try {
      if (claim) {
        await giftService.claimGift(giftId);
      } else {
        await giftService.unclaimGift(giftId);
      }
    } catch (error) {
      console.error('Failed to update gift claim:', error);
    } finally {
      await fetchGifts();
      setClaiming(false);
      setGiftIdBeingClaimed(null);
    }
  };

  const mapLinkToShop = (url: string) => {
    const urlObj = new URL(url);
    const domain = urlObj.hostname.split('.').at(-2);
    switch (domain) {
      case 'amazon':
        return 'Amazon';
      case 'johnlewis':
        return 'John Lewis';
      default:
        return {
          English: 'Manufacturer',
          Hungarian: 'Gyártó',
        }[language];
    }
  };

  const GiftSection = ({ title, className, gifts }: GiftSectionProps) => {
    if (gifts.length === 0) {
      return null;
    }

    return (
      <>
        <tr className="title">
          <td colSpan={4}>{title}:</td>
        </tr>
        {gifts.map((gift) => (
          <tr key={gift.id} className={className}>
            <td>
              {
                {
                  English: gift.nameEnglish,
                  Hungarian: gift.nameHungarian,
                }[language]
              }
            </td>
            <td>~£{gift.price}</td>
            <td>
              {gift.links.map((link, index) => (
                <a
                  key={index}
                  href={giftClaimedByOther(gift) ? undefined : link}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {mapLinkToShop(link)}
                </a>
              ))}
            </td>
            <td>
              <input
                type="checkbox"
                checked={!giftAvailable(gift)}
                disabled={
                  giftClaimedByOther(gift) ||
                  (claiming && giftIdBeingClaimed === gift.id)
                }
                onChange={(e) =>
                  handleCheckboxChange(e.target, gift.id, giftAvailable(gift))
                }
              />
            </td>
          </tr>
        ))}
      </>
    );
  };

  return (
    <table className="gift-list">
      <thead>
        <tr>
          <th></th>
          <th>
            {
              {
                English: 'Price',
                Hungarian: 'Ár',
              }[language]
            }
          </th>
          <th>
            {
              {
                English: 'Where to buy',
                Hungarian: 'Megrendelhető',
              }[language]
            }
          </th>
          <th>
            {
              {
                English: 'Reserved',
                Hungarian: 'Lefoglalva',
              }[language]
            }
          </th>
        </tr>
      </thead>
      <tbody>
        <GiftSection
          title={
            {
              English: 'Reserved by you',
              Hungarian: 'Általad lefoglalva',
            }[language]
          }
          className="claimed-by-you"
          gifts={claimedByYouGifts}
        />
        <GiftSection
          title={
            {
              English: 'Available',
              Hungarian: 'Elérhető',
            }[language]
          }
          className="available"
          gifts={availableGifts}
        />
        <GiftSection
          title={
            {
              English: 'Reserved by others',
              Hungarian: 'Mások által lefoglalva',
            }[language]
          }
          className="claimed-by-other"
          gifts={claimedByOtherGifts}
        />
      </tbody>
    </table>
  );
};

export default GiftList;
