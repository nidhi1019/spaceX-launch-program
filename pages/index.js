import Head from 'next/head'
import styles from '../styles/Home.module.css'
import StaticFilters from '../components/static-filters/static-filters';
import Cards from '../components/cards/cards';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import axiosInstance from '../axios/axios-instance';;

const SpaceXData = (props) => {
  const router = useRouter();
  const queries = router.query;
  const [spaceXData, setSpaceXData] = useState(null);
  const [filters, setFilters] = useState({
    launch_years: [
      { value: 2006, isSelected: false },
      { value: 2007, isSelected: false },
      { value: 2008, isSelected: false },
      { value: 2009, isSelected: false },
      { value: 2010, isSelected: false },
      { value: 2011, isSelected: false },
      { value: 2012, isSelected: false },
      { value: 2013, isSelected: false },
      { value: 2014, isSelected: false },
      { value: 2015, isSelected: false },
      { value: 2016, isSelected: false },
      { value: 2017, isSelected: false },
      { value: 2018, isSelected: false },
      { value: 2019, isSelected: false },
      { value: 2020, isSelected: false }
    ],
    launch_success: [{ value: 'true', isSelected: false }, { value: 'false', isSelected: false }],
    launch_landing: [{ value: 'true', isSelected: false }, { value: 'false', isSelected: false }]
  })

  useEffect(() => {
    if (queries) {
      const isLaunchYear = queries.launch_year ? filters.launch_years.find(item => item.value === +queries.launch_year) : null;
      const isLaunchSuccess = queries.launch_success ? filters.launch_success.find(item => item.value === queries.launch_success) : null;
      const isLandSuccess = queries.land_success ? filters.launch_landing.find(item => item.value === queries.land_success) : null;
      if (isLaunchSuccess) {
        isLaunchSuccess.isSelected = true;
      }
      if (isLandSuccess) {
        isLandSuccess.isSelected = true;
      }
      if (isLaunchYear) {
        isLaunchYear.isSelected = true;
      }
    }
    setFilters({ ...filters });
  }, [])
  const getSelectedFilters = (selectedFilter, eachFilter, isSameFilterSet, queryString, query) => {
    if (isSameFilterSet) {
      eachFilter.isSelected = eachFilter.value === selectedFilter.value ? !eachFilter.isSelected : false;
      if (selectedFilter.value && eachFilter.isSelected) {
        query[queryString] = selectedFilter.value;
      }
    } else {
      if (eachFilter.isSelected) {
        query[queryString] = eachFilter.value;
        return;
      }
    }
  }
  const onApplyFilters = (selectedFilter, name) => {
    let query = {};
    filters.launch_success.forEach(item => {
      getSelectedFilters(selectedFilter, item, name === 'launch', 'launch_success', query);
    });
    filters.launch_landing.forEach(item => {
      getSelectedFilters(selectedFilter, item, name === 'landing', 'land_success', query);
    });
    filters.launch_years.forEach(item => {
      getSelectedFilters(selectedFilter, item, name === 'year', 'launch_year', query);
    });
    onReloadDataWithoutRefresh(query);
  }

  const onReloadDataWithoutRefresh = (query) => {
    router.push({
      pathname: '/',
      query
    }, undefined, { shallow: true })
    axiosInstance.get('/', { params: query }).then(
      res => {
        const spaceXData = res.data;
        setSpaceXData(spaceXData);
      }
    ).catch(err => console.log(err));
  }
  return (
    <div className={styles.container}>
      <Head>
        <title>SpaceX Launch</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h2>
          SpaceX Launch Program
          </h2>
        <section className={styles.section}>
          <div>
            <div className={styles.filters}>
              <div>
                <h4>Filters</h4>
              </div>
              <span>Launch Year</span>
              <hr />
              <div>
                <StaticFilters filters={filters.launch_years} onFilterClick={onApplyFilters} name='year'></StaticFilters>
              </div>

              <span>Successfull Launch</span>
              <hr />
              <div>
                <StaticFilters filters={filters.launch_success} onFilterClick={onApplyFilters} name='launch'></StaticFilters>
              </div>

              <span>Successfull Landing</span>
              <hr />
              <div>
                <StaticFilters filters={filters.launch_landing} onFilterClick={onApplyFilters} name='landing'></StaticFilters>
              </div>
            </div>
          </div>
          <div className={styles.cardSection}>
            <Cards spaceXData={spaceXData ? spaceXData : props.spaceXData}></Cards>
          </div>
        </section>
      </main>

      <footer className={styles.footer}>
        Devleoped By: Nidhi Sengar
        </footer>
    </div>
  )

}

export async function getServerSideProps({ query }) {
  const res = await axiosInstance('/', { params: query });
  const spaceXData = await res.data;
  if (!spaceXData) {
    return {
      notFound: true,
    }
  }
  return {
    props: {
      spaceXData
    }
  }
}
export default SpaceXData;
