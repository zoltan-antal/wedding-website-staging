import { useCallback, useEffect, useState, useRef } from 'react';
import { useOutletContext } from 'react-router-dom';
import giftService from '../../services/gift';
import { Context } from '../../types/context';
import { Gift } from '../../types/gift';
import './GiftList.css';

const STALE_TIME = 1 * 60 * 1000;

const GiftList = () => {
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
  const availableGifts = sortedGifts.filter(
    (gift) => gift.householdId === null
  );
  const claimedByYouGifts = sortedGifts.filter(
    (gift) => gift.householdId === household?.id
  );
  const claimedByOtherGifts = sortedGifts.filter(
    (gift) => gift.householdId !== null && gift.householdId !== household?.id
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

  const handleCheckboxChange = async (giftId: number, claim: boolean) => {
    setGifts((prevGifts) =>
      prevGifts.map((gift) =>
        gift.id === giftId
          ? { ...gift, householdId: claim ? household!.id : null }
          : gift
      )
    );

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
        {claimedByYouGifts.length > 0 && (
          <tr className="title">
            <td colSpan={4}>
              {
                {
                  English: 'Reserved by you',
                  Hungarian: 'Általad lefoglalva',
                }[language]
              }
              :
            </td>
          </tr>
        )}
        {claimedByYouGifts.map((gift) => {
          return (
            <tr key={gift.id}>
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
                    href={link}
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
                  checked
                  onChange={() => handleCheckboxChange(gift.id, false)}
                />
              </td>
            </tr>
          );
        })}
        {availableGifts.length > 0 && (
          <tr className="title">
            <td colSpan={4}>
              {
                {
                  English: 'Available',
                  Hungarian: 'Elérhető',
                }[language]
              }
              :
            </td>
          </tr>
        )}
        {availableGifts.map((gift) => {
          return (
            <tr key={gift.id}>
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
                    href={link}
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
                  checked={false}
                  onChange={() => handleCheckboxChange(gift.id, true)}
                />
              </td>
            </tr>
          );
        })}
        {claimedByOtherGifts.length > 0 && (
          <tr className="title">
            <td colSpan={4}>
              {
                {
                  English: 'Reserved by others',
                  Hungarian: 'Mások által lefoglalva',
                }[language]
              }
              :
            </td>
          </tr>
        )}
        {claimedByOtherGifts.map((gift) => {
          return (
            <tr key={gift.id} className="claimed-by-other">
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
                  <a key={index}>{mapLinkToShop(link)}</a>
                ))}
              </td>
              <td>
                <input type="checkbox" checked disabled />
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default GiftList;
