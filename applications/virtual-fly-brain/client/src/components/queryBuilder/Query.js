import React, { useEffect, useState } from "react";
import { Box, Button, Chip, Divider, Grid, Tooltip } from "@mui/material";
import QueryCard from "./Card";
import { Cross } from "../../icons";
import QueryHeader from "./QueryHeader";
import vars from "../../theme/variables";
import Filter from "./Filter";
import { getUpdatedTags } from "../../utils/utils";
import { deleteQuery } from "./../../reducers/actions/queries"
import { removeRecentSearch } from "./../../reducers/actions/globals"
import { useDispatch } from 'react-redux'

const { headerBorderColor, searchHeadingColor, secondaryBg, listHeadingColor, primaryBg } = vars;
const colors_config = require("../configuration/VFBColors").facets_annotations_colors;
const facets_annotations_colors = getUpdatedTags(colors_config)

export const dividerStyle = {
  height: '0.875rem', width: '0.0625rem', background: listHeadingColor, borderRadius: '0.125rem'
}

const getTags = (tags) => {
  return tags.split("|")
}

const Query = ({ fullWidth, queries }) => {
  const [chipTags , setChipTags] = useState([]);
  const [count, setCount] = useState(0)
  const [filteredSearches, setFilteredSearches] = React.useState(queries);
  const initialFilters = {
    "filters" : {
      "Id" : "id",
      "Name" : "label"
    },
    "tags" : "tags"
  };
  const [filters, setFilters] = React.useState(initialFilters);
  const dispatch = useDispatch();

  const updateFilters = (searches) => {
    setFilteredSearches(searches)
  }

  useEffect( () => {
    let tags = {...initialFilters.filters};
    queries?.forEach( (query, index ) => {
      query.Tags?.forEach( tag => {
        if ( tags?.[tag] == undefined ){
          tags[tag] = tag;
        }
      })
    })
    setFilters({...filters, filters : tags});
  }, [queries])

  const getCount = () => {
    let count = 0;
    queries?.forEach( query => {
      Object.keys(query.queries)?.map( q => {
        if ( query.queries[q]?.active && query.queries[q].rows) {
          count = count + query.queries[q].count;
        }
      })
    })

    return count;
  }

  useEffect( () => {
    setCount(getCount());
    let tags = [];
    queries?.forEach( (query, index ) => {
      Object.keys(query.queries)?.map( q => {
        if ( query.queries[q]?.active ) {
          query.queries[q]?.rows?.forEach( row => {
            const rowTags = getTags(row.tags);
            rowTags?.forEach( rowTag => {
              if ( tags?.find(t => t.label === rowTag) == undefined ){
                tags.push({ label : rowTag, active : true});
              }
            });
          })
        }
      });
    })
    setFilteredSearches(queries)
    setChipTags(tags);
  }, [queries])
  
  const handleChipDelete = (label) => {
    let filtered = [...chipTags];
    filtered.find((tag) => tag?.label === label).active = false;
    setCount(getCount())
    setChipTags(filtered);
  }

  const clearAll = () => {
    filteredSearches?.forEach( q => {
      deleteQuery(q?.short_form);
      dispatch(removeRecentSearch(q?.short_form, true))
    });
  }

  const clearAllTags = () => {
    let tags = [...chipTags]
    tags.forEach( c => c.active = true )
    setCount(getCount())
    setChipTags(tags);
  }

  const handleSort = (value, crescent) => {
    const identifier = filters.filters[value];
    let updatedSearches = [...filteredSearches.sort( (a,b) => {
      if ( a?.[identifier] && b?.[identifier] ){
        return (crescent)* a?.[identifier]?.localeCompare(b?.[identifier] )
      } else if ( a?.[filters.tags] && b?.[filters.tags] ) {
        if ( a?.[filters.tags]?.includes(identifier) ) {
          return -1;
        } else {
          return 0;
        }
      }
    })];
    setFilteredSearches(updatedSearches)
  }

  const handleCrescentEvent = (sort, crescent) => {
    const identifier = filters.filters[sort];
    let updatedSearches = [...filteredSearches.sort( (a,b) => {
      if ( a?.[identifier] && b?.[identifier] ){
        return (crescent * -1 )* a?.[identifier]?.localeCompare(b?.[identifier] )
      } else if ( a?.[filters.tags] && b?.[filters.tags] ) {
        if ( a?.[filters.tags]?.includes(identifier) ) {
          return -1;
        } else {
          return 0;
        }
      }
    })];
    setFilteredSearches(updatedSearches)
  }

  return (
    <>
      <QueryHeader 
        title={ count + " Query results"}
        filters={filters}
        recentSearches={filteredSearches}
        setFilteredSearches={updateFilters}
        clearAll={clearAll}
        handleCrescentEvent={handleCrescentEvent}
        handleSort={handleSort}
      />

      <Box
        position='sticky'
        top={43}
        display='flex'
        alignItems='center'
        zIndex={9}
        px={1.5}
        py={1}
        sx={{
          borderBottom: `0.0625rem solid ${secondaryBg}`,
          background: {
            xs: headerBorderColor,
            lg: 'rgba(34, 34, 34, 0.20)'
          },
          backdropFilter: 'blur(0.625rem)',
        }}
      >
        <Box flex={1}>
          <Box display='flex' gap={0.5}>
            {chipTags?.filter(f => f.active)?.slice(0, fullWidth ? 7 : 10)?.map( (tag, index) => (
              <Chip
                onClick={() => null}
                disabled={!tag.active}
                onDelete={() => handleChipDelete(tag.label)}
                key={tag}
                deleteIcon={
                  <Cross
                    size={12}
                    style={{ marginRight: 0, marginLeft: '0.25rem' }}
                  />
                }
                sx={{
                  lineHeight: '0.875rem',
                  fontSize: '0.625rem',
                  backgroundColor: facets_annotations_colors[tag.label]?.color || facets_annotations_colors?.default?.color,
                  height: '1.25rem',
                  color: facets_annotations_colors[tag.label]?.textColor || facets_annotations_colors?.default?.textColor,
                  '&:hover': {
                    backgroundColor: facets_annotations_colors[tag.label]?.color || facets_annotations_colors?.default?.color,
                    color: facets_annotations_colors[tag.label]?.color || facets_annotations_colors?.default?.textColor
                  }
                }}
                label={tag.label} />
            )) }
            {chipTags?.filter(f => f.active)?.slice(fullWidth ? 7 : 10).length > 0 ? (
              <Tooltip
                arrow
                title={
                  <Box display='flex' py={1} flexWrap='wrap' gap={0.5}>
                    {chipTags?.filter(f => f.active)?.slice(fullWidth ? 7 : 10).map((tag, index) => (
                      <Chip
                        onClick={() => null}
                        onDelete={() => handleChipDelete(tag.label)}
                        key={tag.label + index}
                        deleteIcon={
                          <Cross
                            size={12}
                            style={{ marginRight: 0, marginLeft: '0.25rem' }}
                          />
                        }
                        sx={{
                          lineHeight: '140%',
                          fontSize: '0.625rem',
                          backgroundColor: facets_annotations_colors[tag.label]?.color || facets_annotations_colors?.default?.color,
                          color: facets_annotations_colors[tag.label]?.textColor || facets_annotations_colors?.default?.textColor
                        }}
                        label={tag.label} />
                    ))}
                  </Box>
                }
              >
                <Chip
                  className="default-chip"
                  sx={{ background: primaryBg }}
                  label={`+${chipTags?.slice(fullWidth ? 7 : 10).length}`}
                />
              </Tooltip>
            ) : null}

          </Box>
        </Box>

        <Box display='flex' alignItems='center' gap={ 1.2 }>
          <Filter setChipTags={setChipTags} facets_annotations_colors={facets_annotations_colors} tags={chipTags} clearAllTags={clearAllTags} />
          <Divider sx={dividerStyle} />
          <Button
            disableRipple
            variant="text"
            onClick={clearAllTags}
            sx={{
              minWidth: '0.0625rem',
              padding: 0,
              color: searchHeadingColor,
              fontSize: '0.6875rem',
              fontWeight: 500,
              height: '1.25rem',
              lineHeight: '0.9375rem',
              letterSpacing: '-0.00344rem',

              '&:hover': {
                background: 'transparent'
              }
            }}
          >
            Clear all
          </Button>
        </Box>
      </Box>

      <Box overflow='auto' height='calc(100% - 5.375rem)' p={1.5}>
        <Grid container spacing={1.5}>
          {filteredSearches?.map( (query, index ) => {
            return Object.keys(query.queries)?.map( q => {
              if ( query.queries[q]?.active ) {
                let rows = [];
                if ( query.queries[q]?.rows ){
                  rows = query.queries[q]?.rows;
                } 
                return ( rows?.map((row, index) => {
                  const tags = getTags(row.tags);
                  if ( chipTags?.filter(f => f.active)?.some(v => tags.includes(v.label)) ) {
                    return (
                      <Grid
                        key={index}
                        item
                        xs={12}
                        sm={6}
                        md={4}
                        lg={fullWidth ? 4 : 3}
                        xl={3}
                      >
                        <QueryCard facets_annotation={tags} query={row} fullWidth={fullWidth} />
                      </Grid>
                    )
                  }
                }))
              }
            });
          })}
        </Grid>
      </Box>
    </>
  )
};

export default Query;